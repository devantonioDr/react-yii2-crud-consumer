import TableRow from "@mui/material/TableRow";

import { RowChangeStatusDialogContextProvider } from "../context/RowChangeStatusDialogContext";

import React from "react";
import { RowExtraInfo } from "./commonUi";
import { SmallScreenRowContent } from "./SmallScreenRow";
import { NormalRowContent } from "./NormalRow";
import { TemplateMode } from "../../../types/Template";
import { RowDataContextProvider } from "../context/RowDataProviderContext";

import withSelectedTableRow from "../context/RowSelectContext/withSelected";
import { withExpanded } from "../context/RowShowMoreContext/withExpanded";

// Assign context for ShowMore Row actions

// Assign context for Selected Row actions;
const WithSelectedTableRow = withSelectedTableRow(TableRow);

class RowMainContentWrapper extends React.PureComponent<any> {
  render(): React.ReactNode {
    let { layOutMode, rowData }: any = this.props;

    const showNormalRow = layOutMode === "normal" ? true : false;

    return (
      <>
        <WithSelectedTableRow sx={{ display: showNormalRow ? "table-row" : 'none' }}>
          <NormalRowContent />
        </WithSelectedTableRow>

        <WithSelectedTableRow sx={{ display: showNormalRow ? "none" : 'table-row' }}>
          <SmallScreenRowContent />
        </WithSelectedTableRow>
      </>
    );
  }
}

const RowExtraInfoWithContext = withExpanded(RowExtraInfo);

export function RepairsTableRow({
  data,
  mode,
}: {
  data: ClientData;
  mode: TemplateMode;
}) {
  return (
    <>
      <RowDataContextProvider rowData={data}>
        <RowMainContentWrapper layOutMode={mode} rowData={data} />
        <RowExtraInfoWithContext {...data} />
      </RowDataContextProvider>
    </>
  );
}
