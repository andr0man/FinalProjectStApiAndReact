import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Modal,
  Typography,
  TextField,
  Checkbox,
  IconButton,
  Paper,
  TablePagination,
  Toolbar,
  Tooltip,
  TableSortLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { visuallyHidden } from "@mui/utils";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


const ToDoList = () => {
  const {
    loadToDos,
    toggleToDo,
    deleteToDo,
    updateToDo,
    createToDo,
    loadOneToDosList,
  } = useAction();
  const { toDosListid } = useParams();
  const { toDos, oneToDoList } = useSelector((store) => store.toDos);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [toDoToDelete, setToDoToDelete] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    loadToDos(toDosListid);
    loadOneToDosList(toDosListid);
  }, []);

  const handleToggle = async (id) => {
    const result = await toggleToDo(id);
    if (result.success) {
      loadToDos(toDosListid);
    } else {
      toast.error("Failed to update the task status. Please try again.");
    }
  };

  const handleDateChange = (newDate) => {
    setCurrentToDo((prev) => ({ ...prev, dueDate: dayjs.utc(newDate) }));
  };
  

  const handleAddOrEditToDo = (toDo) => {
    setCurrentToDo({
      ...toDo,
      dueDate: toDo?.dueDate ? dayjs.utc(toDo.dueDate) : null,
    });
    setModalOpen(true);
  };
  

  const handleSave = async () => {
    const response = currentToDo.id
      ? await updateToDo(currentToDo)
      : await createToDo(currentToDo);
    if (response.success) {
      toast.success(response.message);
      setModalOpen(false);
      loadToDos(toDosListid);
    } else {
      toast.error("Failed to save ToDo");
    }
  };

  const confirmDelete = (toDo) => {
    setToDoToDelete(toDo);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (toDoToDelete) {
      const response = await deleteToDo(toDoToDelete.id);
      if (response.success) {
        toast.success(response.message);
        loadToDos(toDosListid);
      } else {
        toast.error("Failed to delete ToDo");
      }
      setDeleteModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentToDo((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    const date = dayjs.utc(dateString).local();
    return date.format("DD.MM.YYYY");
  };
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(visibleRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const EnhancedTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === "isCompleted"}
            direction={orderBy === "isCompleted" ? order : "asc"}
            onClick={(event) => handleRequestSort(event, "isCompleted")}
          >
            IsComplete
            {orderBy === "isCompleted" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={(event) => handleRequestSort(event, "name")}
          >
            Name
            {orderBy === "name" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === "priority"}
            direction={orderBy === "priority" ? order : "asc"}
            onClick={(event) => handleRequestSort(event, "priority")}
          >
            Priority
            {orderBy === "priority" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === "dueDate"}
            direction={orderBy === "dueDate" ? order : "asc"}
            onClick={(event) => handleRequestSort(event, "dueDate")}
          >
            Due Date
            {orderBy === "dueDate" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );

  const EnhancedTableToolbar = () => (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography sx={{ flex: "1 1 100%" }} variant="h5" component="div">
        {oneToDoList?.name}
      </Typography>
      <Typography sx={{ flex: "1 1 20%" }} variant="h5" component="div">
        <Button
        onClick={() => handleAddOrEditToDo({toDoListId: toDosListid})}
        color="primary"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add ToDosList
      </Button>
      </Typography>
      
    </Toolbar>
  );

  const visibleRows = toDos
    .slice()
    .sort((a, b) => {
      if (orderBy === "name") {
        return (a.name < b.name ? -1 : 1) * (order === "asc" ? 1 : -1);
      } else if (orderBy === "priority") {
        return (a.priority - b.priority) * (order === "asc" ? 1 : -1);
      } else if (orderBy === "dueDate") {
        return (
          (new Date(a.dueDate) - new Date(b.dueDate)) *
          (order === "asc" ? 1 : -1)
        );
      } else if (orderBy === "isCompleted") {
        return (
          (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1) *
          (order === "asc" ? 1 : -1)
        );
      }
      return 0;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((toDo) => (
                <TableRow key={toDo.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={toDo.isCompleted}
                      onChange={() => handleToggle(toDo.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {toDo.name}
                  </TableCell>
                  <TableCell align="center">{toDo.priority}</TableCell>
                  <TableCell align="center">
                    {formatDate(toDo.dueDate)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      onClick={() =>
                        handleAddOrEditToDo({
                          id: toDo.id,
                          name: toDo.name,
                          priority: toDo.priority,
                          dueDate: toDo.dueDate,
                          isCompleted: toDo.isCompleted,
                          toDoListId: toDosListid,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button color="error" onClick={() => confirmDelete(toDo)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={toDos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {/* Modal for Adding/Editing ToDo */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              textAlign: "center",
              width: "90%",
            }}
          >
            <Typography variant="h6" component="h2">
              {currentToDo?.id ? "Edit ToDo" : "Add ToDo"}
            </Typography>
            <TextField
              value={currentToDo?.name || ""}
              name="name"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="outlined-number"
              label="Priority"
              name="priority"
              type="number"
              value={currentToDo?.priority}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={currentToDo?.dueDate || null}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              sx={{}}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Confirming Deletion */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h6"
            id="delete-modal-title"
            style={{ textAlign: "center" }}
          >
            Delete ToDo
          </Typography>
          <Typography
            id="delete-modal-description"
            style={{ textAlign: "center", marginBottom: 2 }}
          >
            Are you sure you want to delete the ToDo '{toDoToDelete?.name}'?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setDeleteModalOpen(false)}
            >
              No
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ToDoList;
