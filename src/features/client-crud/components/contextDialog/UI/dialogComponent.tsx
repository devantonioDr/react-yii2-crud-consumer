import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


interface DialogComponentProps {
  children: any;
  title: string,
  dialogHook: any,
  DialogOptionsComp?: any
  keepMounted?:boolean;
}

export const DialogComponent = ({ DialogOptionsComp, dialogHook, title, children,keepMounted }: DialogComponentProps) => {


  const onClose = () => {
    dialogHook.toggle();
  };

  return (
    <>
      <Dialog
        maxWidth="md"
        fullScreen={dialogHook.fullScreen}
        open={dialogHook.open}
        keepMounted={keepMounted}
      // onClose={toggle}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>

          {children}

        </DialogContent>
        <DialogActions>
          {DialogOptionsComp}
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
