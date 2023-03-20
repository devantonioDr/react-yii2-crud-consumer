import TableRow from "@mui/material/TableRow";

import { RowChangeStatusDialogContextProvider } from "../context/RowChangeStatusDialogContext";

import React, { useContext } from "react";

import { SmallScreenRowContent } from "./SmallScreenRow";
import { NormalRowContent } from "./NormalRow";
import { TemplateMode } from "../../../types/Template";
import { RowDataContextProvider } from "../context/RowDataProviderContext";

import { withExpanded } from "../context/RowShowMoreContext/withExpanded";
import useRepairListResponsiveRow from "../hooks/useResponsiveRow";
import { ResponsiveLayoutContext } from "../../../context/ResponsiveLayoutContextProvider";
import { CollapsableRow } from "./CollapsableRow";
import { SelectableRow } from "./SelectableRow";
import { ExtraInfoRow } from "./ExtraInfoRow";


const RowMainContentWrapper = () => {
  const { mode } = useContext(ResponsiveLayoutContext);

  const showNormalRow = mode === "normal" ? true : false;
  
  return (
    <>
      <SelectableRow sx={{ display: showNormalRow ? "table-row" : "none" }}>
        <NormalRowContent />
      </SelectableRow>

      <SelectableRow sx={{ display: showNormalRow ? "none" : "table-row" }}>
        <SmallScreenRowContent />
      </SelectableRow>
    </>
  );
};

export function RepairsTableRow({ data }: { data: ClientData }) {
  return (
    <RowDataContextProvider rowData={data}>
      <RowMainContentWrapper />
      <CollapsableRow>
        <ExtraInfoRow />
      </CollapsableRow>
    </RowDataContextProvider>
  );
}
