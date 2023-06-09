import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

export interface RepairChangeStatusDialogProps {
  open: boolean;
  onClose: () => void;
  isloading: boolean;
  notifySave?: ({ }: any) => void;
  onDelete: () => void;
  wasDeleted: boolean;
}

const DeletedButton = () => {
  return (
    <Button color="success" variant="contained">
      <DeleteIcon style={{opacity:1}} fontSize={"small"} sx={{ mr: 1 }} />
      <span style={{ marginTop: "3px" }}>Eliminado</span>
    </Button>
  );
};

const DeleteButton = (props: { isloading: boolean; onDelete: () => void }) => {
  return (
    <LoadingButton
      color="error"
      loading={props.isloading}
      variant="contained"
      onClick={props.onDelete}
      autoFocus
    >
      <DeleteIcon fontSize={"small"} sx={{ mr: 1 }} />
      <span style={{ marginTop: "3px" }}>SI, ELIMINAR</span>
    </LoadingButton>
  );
};

const CancelButton = (props: { onClose: () => void }) => {
  return <Button onClick={() => props.onClose()}>NO, CANCELAR</Button>;
};

export function DeleteDialog(props: RepairChangeStatusDialogProps) {
  return (
    <Dialog maxWidth="sm" onClose={() => { }} open={props.open}>
      <DialogTitle>¿Está seguro que desea eliminar este cliente?</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          Una vez eliminado, no se puede recuperar ningún dato de este.
        </Typography>
      </DialogContent>
      <DialogActions>

        {props.wasDeleted && <DeletedButton />}

        {!props.wasDeleted &&
          <>
            {!props.isloading && <CancelButton onClose={props.onClose} />}
            <DeleteButton isloading={props.isloading} onDelete={props.onDelete} />
          </>
        }
      </DialogActions>
    </Dialog>
  );
}
