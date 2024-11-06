import React from "react";
import Navbar from "../../navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Loader from "../../loader";
import { useEffect, useState } from "react";

const DefaultLayout = ({ load }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(load);
    }, []);

    return (
        <>
            <Navbar />
            <Container sx={{pt: 3}} fixed maxWidth="xl">
                {!loading ?
                    (<Outlet />) :
                    (<Loader />)}
            </Container>
        </>
    );
}

export default DefaultLayout;