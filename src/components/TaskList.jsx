import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "./taskSlice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const deleteTask = (id) => {
    dispatch(deleteTodo({ name: id }));
  };

  return (
    <div className="tasklist">
    <div className="display-tasks">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 950 }} aria-label="simple table">
            <TableHead sx={{ color: 'white' }}>
              <TableRow sx={{ background: '#444' }}>
                <TableCell align="center" sx={{ color: 'white' }}>Name&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Email ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Mobile No.</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Gender&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Date Of Birth&nbsp;</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks && tasks[0].map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.phone}
                  </TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={{ color: "red", cursor: "pointer" }} onClick={() => deleteTask(row.name)} />
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
