import Button from "@mui/material/Button";
import { useContext } from "react"
import { DialogContext } from "../context/dialogContextProvider";


// export const InsertRepairButtonWithContextHolder = () => {
//     const { dialogHook } = useContext(InsertRepairContext);
// };

export const DialogToggler = (props: { title: string,dialogHook:any }) => {
    return (
        <Button variant="contained" onClick={props.dialogHook.toggle}>
            {props.title}
        </Button>
    )
}