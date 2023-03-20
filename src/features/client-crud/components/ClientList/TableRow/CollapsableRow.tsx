import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { withExpanded } from "../context/RowShowMoreContext/withExpanded";




export const CollapsableRow = withExpanded((props:any) => {
    return (
      <TableRow>
        <TableCell colSpan={11} padding="none" align="left">
          <Collapse in={props.isExpanded}>
  
            {props.children}
  
          </Collapse>
        </TableCell>
      </TableRow>
    );
});  