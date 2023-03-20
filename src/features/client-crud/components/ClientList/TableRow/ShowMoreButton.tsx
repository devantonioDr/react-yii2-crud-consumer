import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { withExpanded } from "../context/RowShowMoreContext/withExpanded";

export const ShowMoreButton = withExpanded((props: any) => {
  return (
    <Box
      // style={getRamdomBackgroundColor()}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        size="small"
        onClick={() => props.onClick && props.onClick(props?.id)}
        disableRipple={false}
        variant="text"
      >
        {props.isExpanded ? "Menos" : "Más"}
      </Button>
    </Box>
  );
});
