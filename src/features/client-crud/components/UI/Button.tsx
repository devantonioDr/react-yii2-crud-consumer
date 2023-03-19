import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export const ButtonWithToolTip = ({ title, Icon, onClick,color }: any) => {
    return (
      <Tooltip arrow title={title}>
        <IconButton  onClick={onClick} size="small">
          <Icon color={color} fontSize={"small"} />
        </IconButton>
      </Tooltip>
    );
  };