import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";

import { Button, Grid, Tooltip } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SkeletonTable from "./SkeletonTable.component";
import { Term } from "../../interfaces/interface";
import EditTermDialog from "../dialogs/editTermDialog.component";
import { toast } from "react-toastify";
import DeleteTerm from "../dialogs/deleteTermDialog.component";

interface Column {
  id: "name" | "startDate" | "endDate";
  label: string;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "startDate", label: "Start Date", minWidth: 170 },
  { id: "endDate", label: "End Date", minWidth: 170 },
];

export default function TableTermComponent(props: {
  addDialog: JSX.Element;
  getData:  () => Promise<Term[]>;
  showEdit: boolean;
  deleteTerm: (id: string) => Promise<any>;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState<Term[]>([]);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      const users = await props.getData();
      setRows(users);
    } catch (e:any) {toast.error(e.message,{})}
    setLoaded(true);
  }, [props]);

  useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>

      <Grid item xs={4}>
        <h2 style={{ textAlign: "left", margin: 0 }}>Terms</h2>
      </Grid>
      <Grid item xs={8} sx={{ marginBottom: "15px", textAlign: "right" }}>
        <Tooltip title="Refresh">
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "5px", marginRight: "5px" }}
            onClick={() => {
              refreshPage();
            }}
          >
            <RefreshIcon />
          </Button>
        </Tooltip>
        {props.addDialog}
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                <TableCell align="center" style={{ width: 300 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {loaded ? (
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {value}
                            </TableCell>
                          );
                        })}

                        <TableCell align="center">
                          {props.showEdit && <EditTermDialog id={row.id}></EditTermDialog>}
                          <DeleteTerm id={row.id} deleteTerm={props.deleteTerm}></DeleteTerm>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <SkeletonTable columns={columns.length + 1}></SkeletonTable>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
