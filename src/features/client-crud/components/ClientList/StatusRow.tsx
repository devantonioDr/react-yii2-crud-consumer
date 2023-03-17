import Chip from "@mui/material/Chip"
// Status
/**
 * Pendiente : 300
 * En proceso: 400
 * Terminada : 500
 * En Sucursal:600
 */


export function StatusRow({ status }: { status: number }) {
    switch (status) {
        case 0:
            return (<Chip label="Pendiente" color="error" />)
        case 1:
            return (<Chip label="En proceso" color="warning" />)
        case 2:
            return (<Chip label="Terminada" color="success" />)
        default:
            return <Chip label={status} color="primary" />
    }
};