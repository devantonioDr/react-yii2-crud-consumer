import TableRow from "@mui/material/TableRow";

import {
  withContextSelectRowTableRow,
} from "../context/RowSelectContext";

import { RowChangeStatusDialogContextProvider } from "../context/RowChangeStatusDialogContext";

import React from "react";
import {
  RowExtraInfo
} from "./commonUi";
import { SmallScreenRowContent } from "./SmallScreenRow";
import { withContextShowMore } from "../context/RowShowMoreContext";
import { RowDeleteDialogContextProvider } from "../context/RowDeleteContext";
import { NormalRowContent } from "./NormalRow";
import { TemplateMode } from "../../../types/Template";



// Assign context for ShowMore Row actions

const RowExtraInfoWithContext = withContextShowMore(RowExtraInfo);

// Assign context for Selected Row actions;
const TableRowWithContext = withContextSelectRowTableRow(TableRow);



class RowMainContentWrapper extends React.PureComponent<any> {
  render(): React.ReactNode {
    let { layOutMode, rowData }: any = this.props;
    return (
      <RowChangeStatusDialogContextProvider rowData={rowData}>
        <RowDeleteDialogContextProvider rowData={rowData}>
          {layOutMode == "normal" && <NormalRowContent data={rowData} />}
          {layOutMode == "stacked" && <SmallScreenRowContent data={rowData} />}
        </RowDeleteDialogContextProvider>
      </RowChangeStatusDialogContextProvider>
    );
  }
}

export function RepairsTableRow({
  data,
  mode,
}: {
  data: ClientData;
  mode: TemplateMode;
}) {
  console.log("RepairsTableRow rerendered.");

  return (
    <>
      <TableRowWithContext invoiceId={data.id}>
        <RowMainContentWrapper layOutMode={mode} rowData={data} />
      </TableRowWithContext>
      {/* Show more row */}
      <RowExtraInfoWithContext
        {...data}
      />
    </>
  );
}
