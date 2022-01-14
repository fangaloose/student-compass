import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";


const SkeletonTable = (props: { columns:number }) => {
    let rowArr:number[] = [0, 0, 0];
    let columnsArr:number[]=[]

    for (let index = 0; index < props.columns; index++) {
      columnsArr.push(0);
    }
  
    return (
      <TableBody>
        {rowArr.map((value, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columnsArr.map((column,index) => {
                return (
                  <TableCell key={index} align="center">
                    <Skeleton variant="rectangular" />
                  </TableCell>
                );
              })}
  
            </TableRow>
          );
        })}
      </TableBody>
    );
  };
  
  export default SkeletonTable