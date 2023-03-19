import Button from "@mui/material/Button";

export const DialogToggler = (props: { title: string,dialogHook:any }) => {
    return (
        <Button variant="contained" onClick={props.dialogHook.toggle}>
            {props.title}
        </Button>
    )
}