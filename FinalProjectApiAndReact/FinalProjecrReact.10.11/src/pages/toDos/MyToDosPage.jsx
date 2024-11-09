import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { toast } from "react-toastify";
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
  Select,
  MenuItem,
  InputLabel,
  TableSortLabel,
  FormControl,
  Toolbar,
  Paper,
  TablePagination,
  Switch,
  FormControlLabel
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";

const MyToDosPage = () => {
  const { toDosList, categories } = useSelector((state) => state.toDos);
  const { user } = useSelector((state) => state.auth);
  const {
    loadToDosList,
    createToDosList,
    updateToDosList,
    deleteToDosList,
    loadCategories,
  } = useAction();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentToDosList, setCurrentToDosList] = useState(null);
  const [toDosListToDelete, setToDosListToDelete] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadToDosList(user.id);
      loadCategories();
    }
  }, []);

  const handleAddOrEditToDosList = (toDosList) => {
    setCurrentToDosList(toDosList || { name: "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    console.log(currentToDosList);
    const response = currentToDosList.id
      ? await updateToDosList(currentToDosList)
      : await createToDosList(currentToDosList);

    if (response.success) {
      toast.success(response.message);
      setModalOpen(false);
      loadToDosList(user.id);
    } else {
      toast.error("Failed to save ToDosList");
    }
  };

  const confirmDelete = (toDosList) => {
    setToDosListToDelete(toDosList);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (toDosListToDelete) {
      const response = await deleteToDosList(toDosListToDelete.id);
      if (response.success) {
        toast.success(response.message);
        loadToDosList(user.id);
      } else {
        toast.error("Failed to delete ToDosList");
      }
      setDeleteModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentToDosList((prev) => ({ ...prev, [name]: value }));
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

  const visibleRows = toDosList
    .slice()
    .sort((a, b) => {
      if (orderBy === "name") {
        return (a.name < b.name ? -1 : 1) * (order === "asc" ? 1 : -1);
      } else if (orderBy === "priority") {
        return (a.priority - b.priority) * (order === "asc" ? 1 : -1);
      } else if (orderBy === "category") {
        return (a.categoryName - b.categoryName) * (order === "asc" ? 1 : -1);
      }
      return 0;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const EnhancedTableHead = () => (
    <TableHead>
      <TableRow>
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
            active={orderBy === "category"}
            direction={orderBy === "category" ? order : "asc"}
            onClick={(event) => handleRequestSort(event, "category")}
          >
            Category
            {orderBy === "category" ? (
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
      <Typography sx={{ flex: "1 1 20%" }} variant="h5" component="div">
        <Button
          onClick={() => handleAddOrEditToDosList({ userId: user.id })}
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Add ToDosList
        </Button>
      </Typography>
    </Toolbar>
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((list) => (
                <TableRow key={list.id}>
                  <TableCell component="th" scope="row" align="center">
                    {list.name}
                  </TableCell>
                  <TableCell align="center">{list.priority}</TableCell>
                  <TableCell align="center">{list.categoryName}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        handleAddOrEditToDosList({
                          id: list.id,
                          name: list.name,
                          priority: list.priority,
                          categoryId: categories.find(
                            (c) => c.name === list.categoryName
                          ).id,
                          userId: user.id,
                        })
                      }
                      color="success"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => confirmDelete(list)} color="error">
                      Delete
                    </Button>
                    <Link to={"ToDosList/" + list.id}>
                      <Button color="info">Go to ToDos List</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={toDosList.length}
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
      {/* Modal for Adding/Editing ToDosList */}
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
              {currentToDosList?.id ? "Edit ToDosList" : "Add ToDosList"}
            </Typography>
            <TextField
              value={currentToDosList?.name || ""}
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
              value={currentToDosList?.priority}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="categoryId"
                value={currentToDosList?.categoryId}
                label="Age"
                onChange={handleChange}
              >
                {categories.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            Delete ToDosList
          </Typography>
          <Typography
            id="delete-modal-description"
            style={{ textAlign: "center", marginBottom: 2 }}
          >
            Are you sure you want to delete the ToDosList '
            {toDosListToDelete?.name}'?
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

export default MyToDosPage;
