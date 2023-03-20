import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";


import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import useRepairListResponsiveRow from "./hooks/useResponsiveRow";
import { TableToolbar } from "./TableToolbar";
import { RepairListContext } from "./context";
import { RepairsTableHeader } from "./headerRow";
import { RepairsTableRow } from "./TableRow";
import { withSelectedCount } from "./context/RowSelectContext/withSelectedCount";

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
const WithSelectedCountToolbar = withSelectedCount(TableToolbar);

export default function RepairsTable() {

  const repairListContext = React.useContext(RepairListContext);
  
  const rows = repairListContext.repairs;

  // Pagination
  const { page, rowsPerPage, setPage, setRowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  return (
    <Paper sx={{ width: "100%", mb: 2, mt: 4 }}>
      <WithSelectedCountToolbar selectedCount={0} />
      <TableContainer>
        <Table
          sx={{  width:"100%",minWidth: 3, padding: "0px 16px 0px 16px" }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <RepairsTableHeader />
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data: ClientData, index: number) => {
              return (
                <RepairsTableRow
                  key={`${data.id}_repair_row_${index}`}
                  data={data}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
        }}
        rowsPerPageOptions={[1, 5, 10, 25]}
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
