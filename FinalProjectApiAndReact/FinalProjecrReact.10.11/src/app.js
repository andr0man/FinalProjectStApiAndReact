import React, { useEffect } from "react";
import MainPage from "./pages/mainPage/MainPage";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import DefaultLayout from "./components/layout/defaultLayout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "./hooks/useAction";
import UsersPage from "./pages/users/UsersPage";
import RolesPage from "./pages/roles/RolesPage";
import NewRolePage from "./pages/roles/NewRolePage";
import UpdateUserPage from "./pages/users/UpdateUserPage";

const App = () => {
    const { isAuth, role } = useSelector((store) => store.auth);
    const { signInByToken } = useAction();

    useEffect(() => {
        const token = localStorage.getItem("auth");

        if (token != null && token != undefined) {
            signInByToken(token);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<MainPage />} />

                {isAuth && role === "admin" && (
                    <>
                        <Route path="users">
                            <Route index element={<UsersPage />} />
                            <Route path="edit/:userid" element={<UpdateUserPage />} />
                        </Route>

                        <Route path="roles">
                            <Route index element={<RolesPage />} />
                            <Route path="newrole/:roleid" element={<NewRolePage />} />
                            <Route path="newrole" element={<NewRolePage />} />
                        </Route>
                    </>
                )}
                {!isAuth && (
                    <>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </>
                )}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
