import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../taskSlice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  console.log("tasks", tasks);
  const dispatch = useDispatch();

  function deleteTask(id) {
    console.log(id);
    dispatch(deleteTodo(id));
  }

  return (
    <div className="tasklist">
      <div className="display-tasks">
        <h3>Member Details</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, }} aria-label="simple table">
            <TableHead sx={{ color: 'white' }}>
              <TableRow sx={{ background: '#1A3151' }}>
                <TableCell sx={{ color: 'white' }}>Mobile No.</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Email ID</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Name&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Gender&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Date Of Birth&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks && tasks !== undefined && tasks[0].map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.phone}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={{color:"red"}} onClick={() => deleteTask(row.name)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TaskList;
