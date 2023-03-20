import Checkbox from "@mui/material/Checkbox";
import { withtSelected } from "../context/RowSelectContext/withSelected";
import { withToggle } from "../context/RowSelectContext/withToggle";

export const SelectRowCheckBox = withToggle(withtSelected(({ selected, onClick, id }: any) => {

  return (
    <Checkbox
      // style={getRamdomBackgroundColor()}
      color="primary"
      className="row_checkbox"
      checked={selected}
      onClick={() => onClick(id)}
      inputProps={{
        "aria-labelledby": id,
      }}
    />
  );
}));
