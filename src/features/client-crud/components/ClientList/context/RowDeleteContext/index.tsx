import {
  createContext,
  useContext,
  useState,
} from "react";

import { RepairListContext } from "..";
import ClientService from "../../../../services/ClientService";
import { useToggleDialog } from "../../../contextDialog/hooks/useToggleDialog";
import { ButtonWithToolTip } from "../../../UI/Button";
import { DeleteDialog } from "../../deleteDialog";
import { RowDataContext } from "../RowDataProviderContext";
import DeleteIcon from "@mui/icons-material/Delete";







type RowDeleteDialogContextProviderProps = {
  children?: any;
};

type RowDeleteDialogContextValue = {
  openDeleteDialog: (rowData: ClientData) => void;
};


export const RowDeleteDialogContext =
  createContext<RowDeleteDialogContextValue>({} as RowDeleteDialogContextValue);

export function RowDeleteDialogContextProvider({
  children,
}: RowDeleteDialogContextProviderProps) {

  const tableContext = useContext(RepairListContext);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const dialogHook = useToggleDialog();

  const [rowData, setRowData] = useState<ClientData>({} as ClientData);

  // When i trigger this function the form data gets passed to this context.
  const openDeleteDialog = (rowData: ClientData) => {
    setRowData(rowData);
    dialogHook.handleClickOpen();
  };


  const onStart = () => {
    setIsloading(true);
    setWasDeleted(false);
  };

  const onError = () => {
    setIsloading(false);
    setWasDeleted(false);
  };

  const onSucces = () => {
    setIsloading(false);
    setWasDeleted(true);
  };

  const onReset = () => {
    setIsloading(false);
    setWasDeleted(false);
  };

  const handleDelete = async () => {

    try {
      onStart()
      await ClientService.delete('client/' + rowData.id) as any;
      onSucces();
      console.log("Client---Delete")
      setTimeout(() => {
        tableContext.fetchNewRepairs();
        dialogHook.handleClose();
        onReset()
      }, 1000);

    } catch (error: any) {
      console.log(error.message);
      onError();
      setTimeout(() => {
        onReset()
      }, 2000);
    }
  };

  const conTextValue = {
    openDeleteDialog
  };
  return (
    <RowDeleteDialogContext.Provider value={conTextValue}>
      {/* Change state dialog */}
      <DeleteDialog
        open={dialogHook.open}
        isloading={isloading}
        onClose={dialogHook.handleClose}
        notifySave={tableContext.fetchNewRepairs}
        onDelete={handleDelete}
        wasDeleted={wasDeleted}
      />

      {children}
    </RowDeleteDialogContext.Provider>
  );
}


export const DeleteButton = () => {
  const { rowData } = useContext(RowDataContext);
  const { openDeleteDialog } = useContext(RowDeleteDialogContext);
  
  return (
    <ButtonWithToolTip
      onClick={() => openDeleteDialog(rowData)}
      title="Delete"
      Icon={DeleteIcon}
      color={"error"}
    />
  );
};