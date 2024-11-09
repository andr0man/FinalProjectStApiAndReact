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

const CategoriesPage = () => {
  debugger;
  const [categoryModal, setCategoryModal] = React.useState(null);

  const handleOpen = (role) => {
    setCategoryModal(role);
  };
  const handleClose = () => {
    setCategoryModal(null);
  };

  const { categories } = useSelector((store) => store.toDos);
  const { loadCategories, deleteCategory } = useAction();

  const deleteHandler = async () => {
    if (categoryModal !== null) {
      const response = await deleteCategory(categoryModal.id);
      if (response.success) {
        toast.success(response.message);
      }
    }
    handleClose();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Box sx={{ px: 4 }}>
      <Box sx={{ textAlign: "right" }}>
        <Link to="newcategory">
          <Button color="success" variant="contained">
            New role
          </Button>
        </Link>
      </Box>
      <Grid container sx={{ mt: 3 }} direction="row" alignItems="center">
        {categories.map((category) => (
          <Grid item xs={4} sx={{ p: 2 }} key={category.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {"Id: " + category.id}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"newcategory/" + category.id}>
                  <Button color="success" variant="contained" size="small">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleOpen(category)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <div>
          <Modal
            open={categoryModal !== null}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 style={{ textAlign: "center" }} id="parent-modal-title">
                Delete category
              </h2>
              <p style={{ textAlign: "center" }} id="parent-modal-description">
                Are you sure you want to delete the category '
                {categoryModal?.name}'?
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
                <Button variant="contained" onClick={() => deleteHandler()}>
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

export default CategoriesPage;
