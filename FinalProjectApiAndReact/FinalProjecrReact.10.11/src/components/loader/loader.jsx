import React from "react";
import { CircularProgress, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";

const Loader = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
        >
            <CircularProgress color="primary" />
        </Box>
    );
}

export default Loader;