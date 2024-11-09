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
  FormControl,
} from "@mui/material";
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

  return (
    <TableContainer>
      <Button
        onClick={() => handleAddOrEditToDosList({userId: user.id})}
        color="primary"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add ToDosList
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toDosList.map((list) => (
            <TableRow key={list.id}>
              <TableCell>{list.name}</TableCell>
              <TableCell>{list.priority}</TableCell>
              <TableCell>{list.categoryName}</TableCell>
              <TableCell>
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
                  <Button color="info">
                    Go to ToDos List
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </TableContainer>
  );
};

export default MyToDosPage;
