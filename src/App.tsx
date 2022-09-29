import React from 'react';
import {
    HashRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Home from './page/Home';
import TermsOfService from './page/TermsOfService';
import styled from "@emotion/styled";

const NavBarTypography = styled(Typography)({
    flexGrow: '1',
    cursor: 'pointer',
});

const NavLinks = styled.div`
  marginLeft: 2em;
  display: flex;
`;

const SingleNavLink = styled(Link)({
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: '4em',
    '&:hover': {
        color: 'black',
        borderBottom: '1px solid black',
    },
});

export default function App() {
    const Layout = () => (
        <AppBar position="static" color="primary">
            <CssBaseline/>
            <Toolbar>
                <NavBarTypography variant="h4">
                    Rackd
                </NavBarTypography>
                <NavLinks>
                    <SingleNavLink to="/">Home</SingleNavLink>
                    <SingleNavLink to="/terms-of-service">Term Of Service</SingleNavLink>
                </NavLinks>
            </Toolbar>
        </AppBar>
    );

    return (
        <div>
            <Router>
                <Layout/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/terms-of-service" element={<TermsOfService/>}/>
                </Routes>
            </Router>
        </div>
    );
}