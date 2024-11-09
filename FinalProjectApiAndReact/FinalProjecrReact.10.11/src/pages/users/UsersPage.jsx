import React, { useEffect } from "react";
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UsersPage = () => {
  const { users } = useSelector((store) => store.user);
  const { loadUsers, deleteUser } = useAction();

  const [userModal, setUserModal] = React.useState(null);

  const handleOpen = (user) => {
    setUserModal(user);
  };
  const handleClose = () => {
    setUserModal(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteHandler = async () => {
    if (userModal) {
      const response = await deleteUser(userModal.id);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
    handleClose();
  };

  return (
    <Box sx={{ px: 4 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.userName}</TableCell>
                <TableCell align="center">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Link to={"edit/" + user.id}>
                    <Button color="primary" variant="contained" size="small">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpen(user)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={userModal !== null}
        onClose={handleClose}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 style={{ textAlign: "center" }} id="user-modal-title">
            Delete User
          </h2>
          <p style={{ textAlign: "center" }} id="user-modal-description">
            Are you sure you want to delete the user '{userModal?.email}'?
          </p>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="contained" color="success" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={deleteHandler}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;
