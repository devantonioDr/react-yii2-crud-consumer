import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

interface DialogRequestOutComeProps {
    type: "negative" | "positive"
    message: string
}



export default function DialogRequestOutCome({ type, message }: DialogRequestOutComeProps) {

    const Icon = type === "positive" ? DoneIcon : HighlightOffIcon;
    const color = type === "positive" ? "success" : "error";
    const headingMessage = type === "positive" ? "Éxitos" : "Algo salió mal";

    return (
        <Container sx={{ minWidth: "100px" }} >
            <Stack spacing={0}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Icon color={color} sx={{ fontSize: 50 }} />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Typography variant='h6'>{headingMessage}</Typography>
                </Box>
            </Stack>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Typography color={"#6b706e"} variant='subtitle1'>{message}</Typography>
            </Box>
        </Container>
    )
}
