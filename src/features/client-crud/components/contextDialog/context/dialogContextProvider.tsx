import { createContext } from "react";
import { useToggleDialog } from "../hooks/useToggleDialog";
import { DialogToggler } from "../UI/dialogToggler";



export const DialogContext = createContext<any>({});

export const DialogContextProvider = (props: any) => {
  // Mui Dialog hook.
  const dialogHook = useToggleDialog();
  return (
    <>
      <DialogContext.Provider value={dialogHook}>

        {props.children}
      </DialogContext.Provider>
    </>
  );
};
