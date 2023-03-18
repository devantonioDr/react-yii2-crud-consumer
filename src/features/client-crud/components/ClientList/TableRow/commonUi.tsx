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

export function ShowMoreButton(props: any) {
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
        {props.isExpanded ? "Menos" : "Más"}
      </Button>
    </Box>
  );
};



const TableTr = ({ title, text, style }: any) => {
  return (
    <tr>
      <td style={style}><Typography>{title}</Typography></td>
      <td style={style}><Typography variant="subtitle1">{text}</Typography></td>
    </tr>
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
              padding: 3,

            }}
          >
            <table>
              <tbody>
                <TableTr title="Name:" text={`${props.perfil.first_name} ${props.perfil.last_name}`} />
                <TableTr title="Email:" text={props.email} />
                <TableTr title="Phone:" text={props.phone} />
                <TableTr
                style={{verticalAlign: 'initial'}}
                  title="Address:"
                  text={`${props.address.address_line_1} ${props.address.address_line_2} ${props.address.city}, ${props.address.state}, ${props.address.zip_code}`}
                />
                <TableTr style={{verticalAlign: 'initial'}} title="Date of Birth:" text={props.perfil.date_of_birth} />
                <TableTr title="Gender:" text={props.perfil.gender} />
                <TableTr style={{verticalAlign: 'initial'}} title="Description:" text={props.perfil.description} />
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
