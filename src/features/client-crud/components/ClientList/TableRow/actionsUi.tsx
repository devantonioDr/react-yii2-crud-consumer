import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { withContextDeleteDialogToggle } from "../context/RowDeleteContext";
import { ButtonWithToolTip } from "../../UI/Button";
import { withContextEditDialogToggle } from "../context/RowEditContext";
import EditIcon from '@mui/icons-material/Edit';



const DeleteButton = ({ handleClickOpen }: { handleClickOpen?: Function }) => {
  return (
    <ButtonWithToolTip
      style={getRamdomBackgroundColor()}
      onClick={handleClickOpen}
      title="Delete"
      Icon={DeleteIcon}
    />
  );
};

const EditRowButton = withContextEditDialogToggle(({ handleClickOpen }: any) => {

  return <ButtonWithToolTip
    style={getRamdomBackgroundColor()}
    onClick={handleClickOpen}
    title="Edit"
    Icon={EditIcon}
  />
});

const DeleteWithContext = withContextDeleteDialogToggle(DeleteButton);

export default function TableRowActions() {
  return (
    <Stack direction="row" spacing={0}>
      <EditRowButton />
      <DeleteWithContext />
    </Stack>
  );
}
