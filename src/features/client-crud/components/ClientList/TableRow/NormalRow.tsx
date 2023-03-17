import TableCell from "@mui/material/TableCell";
import { StatusRow } from "../StatusRow";
import TableRowActions from "./actionsUi";
import Chip from "@mui/material/Chip";
import { withContextSelectRowCheckBox } from "../context/RowSelectContext";

import React from "react";
import {
  InfoIdButton,
  SelectRowCheckBox,
  ShowDate,
  ShowMoreButton,
} from "./commonUi";
import { withContextShowMore } from "../context/RowShowMoreContext";

const ShowMoreButtonWithContext = withContextShowMore(ShowMoreButton);

const SelectRowCheckBoxWithContext =
  withContextSelectRowCheckBox(SelectRowCheckBox);

export const NormalRowContent = ({ data }: { data: ClientData }) => {
  let { id, status, email,perfil } = data;

  return (
    <>
      <TableCell align="left">
        <SelectRowCheckBoxWithContext invoiceId={id} />
      </TableCell>
      <TableCell align="left">
        <ShowMoreButtonWithContext id={id} />
      </TableCell>
      {/* <TableCell align="left">
        <InfoIdButton invoiceId={id} />
      </TableCell> */}
      {/* <TableCell align="left"> {""}</TableCell> */}

      <TableCell align="left">{ `${perfil.first_name} ${perfil.last_name}` }</TableCell>
      <TableCell align="left"> {email}</TableCell>
      <TableCell align="left">
        <StatusRow status={status} />
      </TableCell>
  
      <TableCell align="left">
        <TableRowActions />
      </TableCell>
    </>
  );
};