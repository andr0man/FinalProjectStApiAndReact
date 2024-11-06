import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAction } from "../../hooks/useAction";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const NewRolePage = () => {
    const navigate = useNavigate();
    const { createRole, updateRole } = useAction();
    const { roles } = useSelector((store) => store.user);

    const { roleid } = useParams();

    useEffect(() => {
        console.log(roles.length)
        if(roles.length == 0) {
            navigate("/roles");
        }
    }, [])

    const handleSubmit = async (values) => {
        let response = null;

        if (roleid != undefined) {
            response = await updateRole({ ...values, id: roleid });
        } else {
            response = await createRole(values);
        }
        

        if (!response.success) {
            toast.error(response.message);
        } else {
            toast.success(response.message);
            navigate("/roles");
        }
    };

    const validateYupSchema = Yup.object({
        name: Yup.string().required("Обов'язкове поле"),
    });

    const formik = useFormik({
        initialValues: {
            name:
                roleid != undefined
                    ? roles.find((r) => r.id == roleid)?.name
                    : "",
        },
        validationSchema: validateYupSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
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
                        <AccessibilityIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {roleid != undefined ? "Edit role" : "New Role"}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoFocus
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <Box sx={{ px: 1 }}>
                                <FormLabel
                                    fontSize="inherit"
                                    sx={{ fontSize: "12px", color: "red" }}
                                >
                                    {formik.errors.name}
                                </FormLabel>
                            </Box>
                        ) : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            {roleid != undefined ? "Save" : "Create"}
                        </Button>
                        <Link to="/roles">
                            <Button
                                fullWidth
                                color="secondary"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Back
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default NewRolePage;
