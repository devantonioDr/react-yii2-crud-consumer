import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { DialogContext } from "../context/dialogContextProvider";

export const DialogComponent = (props: { children: any; title: string }) => {
  let dialogHook = useContext(DialogContext);

  const onClose = () => {
    dialogHook.toggle();
  };

  return (
    <>
      <Dialog
        maxWidth="md"
        fullScreen={dialogHook.fullScreen}
        open={dialogHook.open}
        // onClose={toggle}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>

         {props.children}

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
