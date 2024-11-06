import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FormLabel, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAction } from "../../hooks/useAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const { updateUser, loadRoles } = useAction();
    const { users } = useSelector((store) => store.user);
    const { roles } = useSelector((store) => store.user);
    const { userid } = useParams();

    useEffect(() => {
        if (users.length === 0) {
            navigate("/users");
        }
        loadRoles();
    }, []);

    const handleSubmit = async (values) => {
        const response = await updateUser({ ...values, id: userid });

        if (!response.success) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            navigate("/users");
        }
    };

    const validateYupSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        username: Yup.string().required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        role: Yup.string().required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: userid ? users.find((u) => u.id == userid)?.email : "",
            username: userid ? users.find((u) => u.id == userid)?.userName : "",
            firstName: userid ? users.find((u) => u.id == userid)?.firstName : "",
            lastName: userid ? users.find((u) => u.id == userid)?.lastName : "",
            role: userid ? users.find((u) => u.id == userid)?.role : "",
        },
        validationSchema: validateYupSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1 }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit User
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <FormLabel sx={{ color: "red" }}>{formik.errors.email}</FormLabel>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <FormLabel sx={{ color: "red" }}>{formik.errors.username}</FormLabel>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <FormLabel sx={{ color: "red" }}>{formik.errors.firstName}</FormLabel>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <FormLabel sx={{ color: "red" }}>{formik.errors.lastName}</FormLabel>
                    )}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >

                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.role && formik.errors.role && (
                            <FormLabel sx={{ color: "red" }}>{formik.errors.role}</FormLabel>
                        )}
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Save
                    </Button>
                    <Link to="/users">
                        <Button fullWidth color="secondary" variant="contained" sx={{ mt: 2 }}>
                            Back
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default UpdateUserPage;
