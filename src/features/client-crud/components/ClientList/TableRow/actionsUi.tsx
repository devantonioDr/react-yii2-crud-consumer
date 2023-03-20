import Stack from "@mui/material/Stack";
import { DeleteButton } from "../context/RowDeleteContext";
import { EditRowButton } from "../context/RowEditContext";



export default function TableRowActions() {
  
  return (
    <Stack direction="row" spacing={0}>
      <EditRowButton />
      <DeleteButton />
    </Stack>
  );
}
