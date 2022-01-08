import React from 'react';
import {
    Link,
    Outlet
} from "react-router-dom";
import GlobalNav from "./GlobalNav";
import {Container} from "@mui/material";

const Layout = ({user}) => {
    return (
        <>
            <Container fixed>
                <GlobalNav user={user}/>
                <div className="content">
                    <Outlet />
                </div>
            </Container>

        </>
    );
};

export default Layout;