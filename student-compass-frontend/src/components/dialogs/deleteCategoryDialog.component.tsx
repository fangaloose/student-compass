import {
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogBase from "./dialogBase.component";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryService from "../../service/categories.service";

export default function DeleteCategory(props:{id:string}) {
  
  return (
    <>
      <DialogBase
        title="Delete Category"
        icon={<DeleteIcon />}
        color="error"
        variant='text'
        onSubmit={async () => {
          await CategoryService.deleteCategory(props.id);
        }}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure do you want to delete this category?
          </DialogContentText>
         
        </DialogContent>
      </DialogBase>
    </>
  );
}
