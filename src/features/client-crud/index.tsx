import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { withContextSelectRowHeader } from "./components/repairsList/context/RowSelectContext";
import { RepairListContext } from "./components/repairsList/context";
import { RepairsTableHeader } from "./components/repairsList/headerRow";
import useRepairListResponsiveRow from "./components/repairsList/hooks/useResponsiveRow";
import { RepairsTableRow } from "./components/repairsList/TableRow";
import { TableToolbar } from "./components/repairsList/TableToolbar";
import { debug } from "console";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const usePagination = () => {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

// Connect Select row context with tableToolbar to update selected rows state.
const RepairsTableOptionsForSelectedWithContext =
  withContextSelectRowHeader(TableToolbar);

export default function RepairsTable() {
  const repairListContext = React.useContext(RepairListContext);
  const mode = useRepairListResponsiveRow();
  const rows = repairListContext.repairs;
  console.log("repairs", repairListContext.repairs);

  // Pagination
  const { page, rowsPerPage, setPage, setRowsPerPage, handleChangePage,handleChangeRowsPerPage } = usePagination();

  return (
    <Paper sx={{ width: "100%", mb: 2, mt: 4 }}>
      <RepairsTableOptionsForSelectedWithContext selectedCount={0} />
      <TableContainer>
        <Table
          sx={{ minWidth: 3, padding: "0px 16px 0px 16px" }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <RepairsTableHeader mode={mode} />
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data: ClientData, index: number) => {
              return (
                <RepairsTableRow
                  key={`${data.id}_repair_row_${index}`}
                  data={data}
                  mode={mode}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
RepairsTable.defaultProps = {};
