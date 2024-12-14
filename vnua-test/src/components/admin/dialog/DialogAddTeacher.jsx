import { Dialog, DialogTitle, Typography } from "@mui/material";
import { FcPlus, FcVoicePresentation } from "react-icons/fc";

export const DialogAddTeacher = ({open, onClose, title}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle alignItems="center" display={"flex"}>
                <FcVoicePresentation />
                <Typography variant="h6" ml={1}>
                    {title}
                </Typography>
            </DialogTitle>

        </Dialog>
    );
}