import TableCell from "@mui/material/TableCell";
import TableRowActions from "./actionsUi";

import { Typography } from "@mui/material";
import withRowData from "../context/RowDataProviderContext/withRowData";
import { SelectRowCheckBox } from "./SelectRowCheckBox";
import { ShowMoreButton } from "./ShowMoreButton";


const ImprovedTableCell = ({ Content, width }: any) => {
  return (
    <TableCell  padding="none" align="left">
      {Content}
    </TableCell>
  )
}

export const NormalRowContent = withRowData(({ rowData }: any) => {
  const { id, status, email, perfil } = rowData;


  return (
    <>
      <ImprovedTableCell Content={<SelectRowCheckBox />} />
      <ImprovedTableCell Content={<ShowMoreButton />} />
      <ImprovedTableCell Content={`${perfil?.first_name} ${perfil?.last_name}`} />
      <ImprovedTableCell Content={email} />
      <ImprovedTableCell Content={<TableRowActions />} />
    </>
  );
});
