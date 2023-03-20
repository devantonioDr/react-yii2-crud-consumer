import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import withRowData from "../context/RowDataProviderContext/withRowData";


export const ExtraInfoRow = withRowData(({ rowData }: any) => {
    
    return (<Stack
        component={"div"}
        sx={{
            boxShadow:
                "inset 0 4px 8px -5px rgb(50 50 50 / 75%), inset 0 -4px 8px -5px rgb(50 50 50 / 75%);",
            padding: 3,

        }}
    >
        <table>
            <tbody>
                <TableTr title="Name:" text={`${rowData.perfil.first_name} ${rowData.perfil.last_name}`} />
                <TableTr title="Email:" text={rowData.email} />
                <TableTr title="Phone:" text={rowData.phone} />
                <TableTr
                    style={{ verticalAlign: 'initial' }}
                    title="Address:"
                    text={`${rowData.address.address_line_1} ${rowData.address.address_line_2} ${rowData.address.city}, ${rowData.address.state}, ${rowData.address.zip_code}`}
                />
                <TableTr style={{ verticalAlign: 'initial' }} title="Date of Birth:" text={rowData.perfil.date_of_birth} />
                <TableTr title="Gender:" text={rowData.perfil.gender} />
                <TableTr style={{ verticalAlign: 'initial' }} title="Description:" text={rowData.perfil.description} />
            </tbody>
        </table>
    </Stack>)
});

const TableTr = ({ title, text, style }: any) => {
    return (
        <tr>
            <td style={style}><Typography variant="subtitle1">{title}</Typography></td>
            <td style={style}><Typography >{text}</Typography></td>
        </tr>
    );
};