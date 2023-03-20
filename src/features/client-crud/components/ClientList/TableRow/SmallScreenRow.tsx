import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import withRowData from "../context/RowDataProviderContext/withRowData";

import TableRowActions from "./actionsUi";
import { SelectRowCheckBox } from "./SelectRowCheckBox";
import { ShowMoreButton } from "./ShowMoreButton";

const SmallScreenRowCell = memo(({ title, value }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{title}</Typography>
      <Typography variant="subtitle1">{value}</Typography>
      {/* <span>{value}</span> */}
    </Box>
  );
});

export const SmallScreenRowContent = withRowData(({ rowData }: any) => {
  const { id, status, email, perfil } = rowData;

  return (
    <>
      <TableCell padding="none" align="left">
        <Stack padding={2} spacing={3}>
          <SmallScreenRowCell title="" value={<SelectRowCheckBox />} />
          <SmallScreenRowCell title="Nombre:"value={`${perfil.first_name} ${perfil.last_name}`} />
          <SmallScreenRowCell title="Email:" value={email} />
          <SmallScreenRowCell title="Acciones:" value={<TableRowActions />} />
          <ShowMoreButton />
        </Stack>
      </TableCell>
    </>
  );
});
