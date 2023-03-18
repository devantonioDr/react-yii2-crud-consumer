import Button from "@mui/material/Button";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { RepairListContext } from "..";
import { EfficientFormContextProvider, withContextEfficientFormSubmit } from "../../../../context/EfficientFormContextProvider";
import { filterNonObjects, nestObjectKeys } from "../../../../helper/objectHelpers";
import ClientService from "../../../../services/ClientService";
import { ClientFormWithStepper, client_form_stepper_state } from "../../../clientForm";
import { useToggleDialog } from "../../../contextDialog/hooks/useToggleDialog";
import { DialogComponent } from "../../../contextDialog/UI/dialogComponent";
import { StepperContextProvider } from "../../../contextStepper/context/StepperContextProvider";


type RowEditDialogContextProviderProps = {
  rowData: ClientData;
  children?: any;
};



export const RowEditDialogContext = createContext<any>({} as any);

export function RowEditDialogContextProvider({
  children,
  rowData,
}: RowEditDialogContextProviderProps) {
  const tableContext = useContext(RepairListContext);

  const [isloading, setIsloading] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);


  const onError = useCallback(() => {
    setIsloading(false);
    setWasDeleted(false);
  }, []);

  const handleSubmit = useCallback(async (formData: any) => {

    const nested = nestObjectKeys(formData.data);
    const data = nestObjectKeys(formData.data);

    const cliente = filterNonObjects(data);
    const { perfil, address } = data;

    console.log('nested', nested);

    try {
      await ClientService.put('client/' + rowData.id, cliente) as any;
      await Promise.all([
        ClientService.put('perfil/' + perfil.id, perfil),
        ClientService.put('address/' + address.id, address)
      ]);
      setIsloading(false);
      setWasDeleted(true);
      console.log("Client---Update")
      setTimeout(() => {
        tableContext.fetchNewRepairs();
        dialogHook.handleClose();
        setWasDeleted(false);
      }, 500);

    } catch (error: any) {
      console.log(error.message);
      onError();
    }


  }, []);

  const dialogHook = useToggleDialog();

  const conTextValue = {
    handleClickOpen: dialogHook.handleClickOpen,
  };




  return (
    <RowEditDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}

      <EfficientFormContextProvider unRegisterFields={false} data={rowData} submitForm={handleSubmit as any}>
        <StepperContextProvider steps_initial_state={client_form_stepper_state}>
          <DialogComponent
            keepMounted={false}
            dialogHook={dialogHook}
            title="Editar cliente"
            DialogOptionsComp={
              <>
                <Button onClick={dialogHook.toggle}>Cerrar</Button>
                <SaveChangesButton >Guardar</SaveChangesButton>
              </>
            }
            DialogContentComp={<ClientFormWithStepper />}
          />
        </StepperContextProvider>
      </EfficientFormContextProvider>


      {children}
    </RowEditDialogContext.Provider>
  );
}

const SaveChangesButton = withContextEfficientFormSubmit(Button);

// Comsumers
// This consumer only cares about the toggleDialog Function.

export function withContextEditDialogToggle<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return (props: P) => {
    const state = useContext(RowEditDialogContext);

    return <PureComponent {...props} handleClickOpen={state.handleClickOpen} />;
  };
}
