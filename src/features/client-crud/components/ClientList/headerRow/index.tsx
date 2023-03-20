import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { ResponsiveLayoutContext } from "../../../context/ResponsiveLayoutContextProvider";
import { withContextSelectAllCheckbox } from "../context/RowSelectContext/withContextSelectAllCheckbox";
import useRepairListResponsiveRow from "../hooks/useResponsiveRow";

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

const ImprovedTh = ({ Content,width }: any) => {

  return (
    <TableCell width={width} padding="none" >
      {Content}
    </TableCell>
  );

};

export function RepairsTableHeader() {
  const { mode } = useContext(ResponsiveLayoutContext);
  let lables = [
    { title: "", width: "20%" },
    { title: "Nombre", width: "20%" },
    { title: "Email", width: "25%" },
    { title: "Acciones", width: "25%" },
  ];

  return (
    <TableHead>
      <TableRow>
        <ImprovedTh width = "10%" Content={<SelectAllCheckBoxWithContext />} />

        {mode == "normal" &&
          lables.map(({ title, width }) => (
            <ImprovedTh
              width={width}
              key={title}
              Content={
                <Typography sx={{ color: "#1565c0" }}>{title}</Typography>
              }
            />
          ))}
      </TableRow>
    </TableHead>
  );
}
