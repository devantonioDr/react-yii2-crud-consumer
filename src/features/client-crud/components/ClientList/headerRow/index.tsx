import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { withContextSelectAllCheckbox } from "../context/RowSelectContext";

export const SelectAllCheckBox = ({
  indeterminate,
  checked,
  onChange,
  ...props
}: any) => {
  return (
    <Checkbox
      color="primary"
      {...props}
      indeterminate={indeterminate}
      checked={checked}
      onChange={onChange}
      inputProps={{
        "aria-label": "select-all-repairs",
      }}
    />
  );
};

const SelectAllCheckBoxWithContext =
  withContextSelectAllCheckbox(SelectAllCheckBox);

export function RepairsTableHeader({ mode }: any) {
  let lables = [
    "",
    "Nombre",
    // "IMEI",
    "Email",
    "Acciones",
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none">
          <SelectAllCheckBoxWithContext />
        </TableCell>
        {mode == "normal" &&
          lables.map((headCell) => (
            <TableCell
              // style={getRamdomBackgroundColor()}
              padding="none"
              key={headCell}
              align={"left"}
            >
              <Typography sx={{color:'#1565c0'}}>{headCell}</Typography>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
