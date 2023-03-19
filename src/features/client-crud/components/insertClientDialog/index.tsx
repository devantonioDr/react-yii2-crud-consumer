import { useContext, useState } from "react";

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
import DialogRequestOutCome from "../contextDialog/UI/dialogRequestOutCome";
import { WithProvidersClientForm } from "../clientForm/withProvidersClientForm";
import { useFeedBackDialog } from "../contextDialog/hooks/useFeedBackDialog";










export const InsertClientDialog = ({ }) => {

  const tableContext = useContext(RepairListContext);

  const feedBackDialog = useFeedBackDialog();

  const dialogHook = useToggleDialog();

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
      feedBackWithDissmiss("Se creo un cliente nuevo!!", "positive");
      fecthNewClients();
    } catch (error: any) {
      feedBackWithDissmiss(error.message, "negative");
    }
    return {};
  }






  return (
    <>
      <DialogToggler dialogHook={dialogHook} title="Insertar client nuevo" />
      <WithProvidersClientForm
        title="Insertar client nuevo"
        dialogHook={dialogHook}
        keepMounted={false}
        feedBackDialog={feedBackDialog}
        submitForm={submitForm}
        DialogOptionsComp={
          <Button variant="contained" onClick={dialogHook.toggle}>Cerrar</Button>
        }
      />
    </>
  );
};
