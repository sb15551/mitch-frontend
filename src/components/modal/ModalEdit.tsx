import {Slide} from "@mui/material";
import React, {forwardRef} from "react";
import {TransitionProps} from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// export const ModalEdit: FC<FullScreenModalProps> = ({handleClose, open, titleModalEdit, isModifyField, submitForm}) => {
//
//     return (
//         <div>
//             <Dialog
//                 fullScreen
//                 open={open}
//                 onClose={handleClose}
//                 TransitionComponent={Transition}
//             >
//                 <AppBar sx={{position: "relative", background: "black"}}>
//                     <Toolbar>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             onClick={() => handleClose(false)}
//                             aria-label="close"
//                         >
//                             <CloseIcon/>
//                         </IconButton>
//                         <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
//                             {titleModalEdit}
//                         </Typography>
//                         <Button disabled={isModifyField} autoFocus color="inherit" onClick={submitForm}>
//                             save
//                         </Button>
//                     </Toolbar>
//                 </AppBar>
//             </Dialog>
//         </div>
//     )
//
// }