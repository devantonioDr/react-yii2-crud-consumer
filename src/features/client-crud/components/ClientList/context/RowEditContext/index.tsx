import Button from "@mui/material/Button";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";

import { RepairListContext } from "..";
import {  withContextEfficientFormSubmit } from "../../../../context/EfficientFormContextProvider";
import { filterNonObjects, nestObjectKeys } from "../../../../helper/objectHelpers";
import ClientService from "../../../../services/ClientService";
import { WithProvidersClientForm } from "../../../clientForm/withProvidersClientForm";
import { useFeedBackDialog } from "../../../contextDialog/hooks/useFeedBackDialog";
import { useToggleDialog } from "../../../contextDialog/hooks/useToggleDialog";


/*
 This context responsability is to open the form to 
 edit the table info at the current row
*/



type RowEditDialogContextProviderProps = {
  children?: any;
};



export const RowEditDialogContext = createContext<any>({} as any);

export function RowEditDialogContextProvider({ children }: RowEditDialogContextProviderProps) {



  console.log("Edit form ready");
  const tableContext = useContext(RepairListContext);

  const feedBackDialog = useFeedBackDialog();

  const dialogHook = useToggleDialog();
  const [rowData, setRowData] = useState<ClientData>({} as ClientData);

  // When i trigger this function the form data gets passed to this context.
  const openEditForm = (rowData: ClientData) => {
    setRowData(rowData);
    dialogHook.handleClickOpen();
  }


  const feedBackWithDissmiss = (message: string, type: "positive" | "negative") => {
    feedBackDialog.handleOpen(message, type);
    setTimeout(() => {
      feedBackDialog.handleClose();
      dialogHook.handleClose();
    }, 3000);
  };

  const fecthNewClients = () => {
    setTimeout(() => {
      tableContext.fetchNewRepairs();
    }, 1000);
  }


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
      feedBackWithDissmiss("Se editó el cliente " + perfil?.first_name, "positive")
      console.log("Client---Update")
      fecthNewClients()

    } catch (error: any) {
      console.log(error.message);
      feedBackWithDissmiss(error.message, "positive")
    }


  }, []);


  const conTextValue = {
    openEditForm
  };

  return (
    <RowEditDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <WithProvidersClientForm
        keepMounted={false}
        data={rowData}
        title="Editar cliente"
        dialogHook={dialogHook}
        feedBackDialog={feedBackDialog}
        submitForm={handleSubmit}
        unRegisterFields={false}
        DialogOptionsComp={
          <>
            <Button variant="contained" onClick={dialogHook.toggle}>Cerrar</Button>
            <SaveChangesButton variant="outlined" >Guardar</SaveChangesButton>
          </>
        }
      />
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
