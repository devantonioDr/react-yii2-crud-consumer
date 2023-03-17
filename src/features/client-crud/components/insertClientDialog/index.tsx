import { useContext } from "react";

// Hooks
import { useToggleDialog } from "../contextDialog/hooks/useToggleDialog";
import { filterNonObjects, nestObjectKeys } from "../../helper/objectHelpers";
import { DialogContextProvider } from "../contextDialog/context/dialogContextProvider";
import { DialogToggler } from "../contextDialog/UI/dialogToggler";
import { DialogComponent } from "../contextDialog/UI/dialogComponent";
import { StepperContextProvider } from "../contextStepper/context/StepperContextProvider";
import { ClientForm } from "../clientForm";
import ClientService from "../../services/ClientService";
import { RepairListContext } from "../ClientList/context";
import { EfficientFormContextProvider } from "../../context/EfficientFormContextProvider";

export const InsertClientDialog = ({ }) => {

  const tableContext = useContext(RepairListContext);


  const submitForm = async (values: any) => {

    const data = nestObjectKeys(values.data);
    data.status = 0;

    const cliente = filterNonObjects(data);
    const {perfil,address} = data;

 
   
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
        <DialogToggler dialogHook={dialogHook} title="Insertar client nuevo" />
        <DialogComponent dialogHook={dialogHook} title="Insertar client nuevo">
          <ClientForm  />
        </DialogComponent>
      </EfficientFormContextProvider>
    </>
  );
};
