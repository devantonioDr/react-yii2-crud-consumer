import TableCell from "@mui/material/TableCell";
import TableRowActions from "./actionsUi";

import  { useContext } from "react";
import {
  SelectRowCheckBox,
  ShowMoreButton,
} from "./commonUi";

import { Typography } from "@mui/material";
import { withSelectRowCheckBox } from "../context/RowSelectContext/withSelectRowCheckBox";
import { withExpanded } from "../context/RowShowMoreContext/withExpanded";
import { RowDataContext } from "../context/RowDataProviderContext";
import withRowData from "../context/RowDataProviderContext/withRowData";

const WithExpandedShowMoreButton = withExpanded(ShowMoreButton);

const SelectRowCheckBoxWithContext = withSelectRowCheckBox(SelectRowCheckBox);

export const NormalRowContent = withRowData(({rowData}:any) => {
  const {id, status, email, perfil } = rowData;
  
  return (
    <>
      <TableCell padding="none" align="left">
        <SelectRowCheckBoxWithContext invoiceId={id} />
      </TableCell>
      <TableCell padding="none" align="left">
        <WithExpandedShowMoreButton id={id} />
      </TableCell>

      <TableCell padding="none" align="left">
        <Typography variant="subtitle1">
          {`${perfil?.first_name} ${perfil?.last_name}`}
        </Typography>
      </TableCell>
      <TableCell padding="none" align="left">
        <Typography variant="subtitle1">{email}</Typography>
      </TableCell>
      {/* <TableCell align="left">
        <StatusRow status={status} />
      </TableCell> */}

      <TableCell padding="none" align="left">
        <TableRowActions />
      </TableCell>
    </>
  );
});
