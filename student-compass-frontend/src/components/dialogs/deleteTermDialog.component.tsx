import {
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogBase from "./dialogBase.component";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteTerm(props:{id:string,deleteTerm:(id:string)=>Promise<any>}) {
  
  return (
    <>
      <DialogBase
        title="Delete Term"
        icon={<DeleteIcon />}
        color="error"
        variant='text'
        onSubmit={async () => {
          await props.deleteTerm(props.id);
        }}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure do you want to delete this term?
          </DialogContentText>
         
        </DialogContent>
      </DialogBase>
    </>
  );
}
