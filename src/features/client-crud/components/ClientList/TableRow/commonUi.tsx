import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";

export function InfoIdButton({ invoiceId }: { invoiceId: string | number }) {
  return (
    <Chip clickable={true} label={invoiceId} variant="filled" color="primary" />
  );
};

export function ShowDate({ admissionDate }: { admissionDate: string }) {
  let date = moment(admissionDate).format("DD/MM/YYYY");
  return <Typography variant="subtitle1" >{date}</Typography>;
};

export function ShowMoreButton(props:any) {
  return (
    <Box
      // style={getRamdomBackgroundColor()}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        size="small"
        onClick={() => props.onClick && props.onClick(props.id)}
        disableRipple={false}
        variant="text"
      >
        {props.isExpanded ? "less" : "more"}
      </Button>
    </Box>
  );
};




interface RowExtraInfoProps extends ClientData {
  isExpanded?: boolean;
}

export function RowExtraInfo(props: RowExtraInfoProps) {

  return (
    <TableRow
    // style={getRamdomBackgroundColor()}
    >
      <TableCell colSpan={11} padding="none" align="left">
        <Collapse in={props.isExpanded}>
          <Stack
            component={"div"}
            sx={{
              boxShadow:
                "inset 0 4px 8px -5px rgb(50 50 50 / 75%), inset 0 -4px 8px -5px rgb(50 50 50 / 75%);",
              padding: 2,
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{props.perfil.first_name} {props.perfil.last_name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{props.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{props.phone}</td>
                </tr>
                {/* <tr>
                  <td>Status:</td>
                  <td>{props.status}</td>
                </tr> */}
                <tr>
                  <td style={{verticalAlign: 'initial'}}>Address:</td>
                  <td>{props.address.address_line_1} {props.address.address_line_2} {props.address.city}, {props.address.state}, {props.address.zip_code}</td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td style={{verticalAlign: 'initial'}}>{props.perfil.date_of_birth}</td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>{props.perfil.gender}</td>
                </tr>
                <tr>
                  <td style={{verticalAlign: 'initial'}}>Description:</td>
                  <td>{props.perfil.description}</td>
                </tr>
                </tbody>
            </table>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export function SelectRowCheckBox({ selected, onClick, invoiceId }: any) {
  return (
    <Checkbox
      // style={getRamdomBackgroundColor()}
      color="primary"
      className="row_checkbox"
      checked={selected}
      onClick={() => onClick(invoiceId)}
      inputProps={{
        "aria-labelledby": invoiceId,
      }}
    />
  );
};
