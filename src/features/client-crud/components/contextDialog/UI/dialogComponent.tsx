import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, } from "react";


interface DialogComponentProps {
  title: string,
  dialogHook: any,
  DialogOptionsComp?: any
  keepMounted?: boolean;
  DialogContentComp?: any
}

export const DialogComponent = forwardRef(({
  DialogOptionsComp,
  dialogHook,
  title,
  keepMounted,
  DialogContentComp
}: DialogComponentProps, ref) => {


  return (
    <>
      <Dialog
        maxWidth="md"
        fullScreen={dialogHook.fullScreen}
        open={dialogHook.open}
        keepMounted={keepMounted} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent ref={ref} >

          {DialogContentComp}

        </DialogContent>
        <DialogActions>
          {DialogOptionsComp}

        </DialogActions>
      </Dialog>
    </>
  );
});
