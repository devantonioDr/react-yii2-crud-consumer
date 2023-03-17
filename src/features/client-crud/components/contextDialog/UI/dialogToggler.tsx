import Button from "@mui/material/Button";
import { useContext } from "react"
import { DialogContext } from "../context/dialogContextProvider";


// export const InsertRepairButtonWithContextHolder = () => {
//     const { dialogHook } = useContext(InsertRepairContext);
// };

export const DialogToggler = (props: { title: string }) => {
    const dialogHook = useContext(DialogContext);

    return (
        <Button variant="contained" onClick={dialogHook.toggle}>
            {props.title}
        </Button>
    )
}