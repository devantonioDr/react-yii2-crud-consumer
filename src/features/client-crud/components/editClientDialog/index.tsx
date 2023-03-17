import { useContext } from "react";


// Hooks
import { useToggleDialog } from "../contextDialog/hooks/useToggleDialog";
import { nestObjectKeys } from "../../helper/objectHelpers";
import { DialogContextProvider } from "../contextDialog/context/dialogContextProvider";
import { DialogToggler } from "../contextDialog/UI/dialogToggler";
import { DialogComponent } from "../contextDialog/UI/dialogComponent";
import { ClientForm } from "../clientForm";


export const EditClientDialog = ({ }) => {

    const submitForm = (values: any) => {
        console.log(nestObjectKeys(values.data));

        return {};
    }

    return (
        <>
            <DialogContextProvider>
                <DialogToggler title="Insert a client" />
                <DialogComponent title="Insert a client">
                    <ClientForm submitForm={submitForm} />
                </DialogComponent>
            </DialogContextProvider>
        </>
    );
};
