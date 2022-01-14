import {
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogBase from "./dialogBase.component";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteUser(props:{id:string,deleteUser:(id:string)=> Promise<any>}) {
  
  return (
    <>
      <DialogBase
        title="Delete User"
        icon={<DeleteIcon />}
        color="error"
        variant='text'
        onSubmit={async () => {
          await props.deleteUser(props.id)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure do you want to delete this user?
          </DialogContentText>
         
        </DialogContent>
      </DialogBase>
    </>
  );
}
