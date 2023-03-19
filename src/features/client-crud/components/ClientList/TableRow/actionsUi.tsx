import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { withContextDeleteDialogToggle } from "../context/RowDeleteContext";
import { ButtonWithToolTip } from "../../UI/Button";
import { RowEditDialogContext } from "../context/RowEditContext";
import EditIcon from '@mui/icons-material/Edit';
import { RowDataContext } from "../context/RowDataProviderContext";



const DeleteButton = ({ handleClickOpen }: { handleClickOpen?: Function }) => {
  return (
    <ButtonWithToolTip
      onClick={handleClickOpen}
      title="Delete"
      Icon={DeleteIcon}
      color={"error"}
    />
  );
};

const EditRowButton = () => {
  const {rowData} = useContext(RowDataContext);
  const {openEditForm} = useContext(RowEditDialogContext);
  
  return <ButtonWithToolTip
    onClick={()=>openEditForm(rowData)}
    title="Edit"
    Icon={EditIcon}
    color="primary"
  />
};

const DeleteWithContext = withContextDeleteDialogToggle(DeleteButton);

export default function TableRowActions() {
  return (
    <Stack direction="row" spacing={0}>
      <EditRowButton />
      <DeleteWithContext />
    </Stack>
  );
}
