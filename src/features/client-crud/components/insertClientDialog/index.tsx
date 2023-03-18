import { useContext } from "react";

// Hooks
import { useToggleDialog } from "../contextDialog/hooks/useToggleDialog";
import { filterNonObjects, nestObjectKeys } from "../../helper/objectHelpers";
import { DialogToggler } from "../contextDialog/UI/dialogToggler";
import { DialogComponent } from "../contextDialog/UI/dialogComponent";
import { StepperContextProvider } from "../contextStepper/context/StepperContextProvider";
import { ClientFormWithStepper, client_form_stepper_state } from "../clientForm";
import ClientService from "../../services/ClientService";
import { RepairListContext } from "../ClientList/context";
import { EfficientFormContextProvider } from "../../context/EfficientFormContextProvider";
import Button from "@mui/material/Button";

export const InsertClientDialog = ({ }) => {

  const tableContext = useContext(RepairListContext);


  const submitForm = async (values: any) => {

    const data = nestObjectKeys(values.data);
    data.status = 0;

    const cliente = filterNonObjects(data);
    const { perfil, address } = data;



    try {
      let resp = await ClientService.post('client', cliente) as any;
      perfil['client_id'] = resp.data.id;
      address['client_id'] = resp.data.id;
      // debugger;
      await Promise.all([
        ClientService.post('perfil', perfil),
        ClientService.post('address', address)
      ]);

      console.log("Client---Insert")
      setTimeout(() => {
        tableContext.fetchNewRepairs();
        dialogHook.handleClose();
      }, 1000);

    } catch (error: any) {
      console.log(error.message);
    }
    return {};
  }
  const dialogHook = useToggleDialog();

  return (
    <>
      < EfficientFormContextProvider unRegisterFields={true} submitForm={submitForm as any}>
        <StepperContextProvider steps_initial_state={client_form_stepper_state}>

          <DialogToggler dialogHook={dialogHook} title="Insertar client nuevo" />
          <DialogComponent
            dialogHook={dialogHook}
            title="Insertar client nuevo"
            DialogContentComp={<ClientFormWithStepper />}
            DialogOptionsComp={<Button onClick={dialogHook.toggle}>Cerrar</Button>}
          />

        </StepperContextProvider>
      </EfficientFormContextProvider>
    </>
  );
};
