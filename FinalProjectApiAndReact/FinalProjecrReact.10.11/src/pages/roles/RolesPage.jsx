import React, { useEffect } from "react";
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

const RolesPage = () => {
    const [roleModal, setRoleModal] = React.useState(null);

    const handleOpen = (role) => {
        setRoleModal(role);
    };
    const handleClose = () => {
        setRoleModal(null);
    };

    const { roles } = useSelector((store) => store.user);
    const { loadRoles, deleteRole } = useAction();

    const deleteHandler = async () => {
        if (roleModal != null) {
            const response = await deleteRole(roleModal.id);
            if (response.success) {
                toast.success(response.message);
            }
        }
        handleClose();
    };

    useEffect(() => {
        loadRoles();
    }, []);

    return (
        <Box sx={{ px: 4 }}>
            <Box sx={{ textAlign: "right" }}>
                <Link to="newrole">
                    <Button color="success" variant="contained">
                        New role
                    </Button>
                </Link>
            </Box>
            <Grid container sx={{ mt: 3 }} direction="row" alignItems="center">
                {roles.map((role) => (
                        <Grid item xs={4} sx={{ p: 2 }} key={role.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image="https://www.shutterstock.com/image-photo/blank-puzzles-wooden-cubes-role-260nw-2014277675.jpg"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {role.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {"Id: " + role.id}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"newrole/" + role.id}>
                                    <Button
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        >
                                        Edit
                                    </Button>
                                        </Link>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleOpen(role)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                ))}
                <div>
                    <Modal
                        open={roleModal != null}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h2
                                style={{ textAlign: "center" }}
                                id="parent-modal-title"
                            >
                                Delete role
                            </h2>
                            <p
                                style={{ textAlign: "center" }}
                                id="parent-modal-description"
                            >
                                Are you sure you want to delete the role '
                                {roleModal?.name}'?
                            </p>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleClose()}
                                >
                                    No
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => deleteHandler()}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </div>
            </Grid>
        </Box>
    );
};

export default RolesPage;
