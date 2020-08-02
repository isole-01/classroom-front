import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";


import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/favicon.png";






const useStyles = makeStyles(styles);

export default function Admin({ routes,...rest }) {
    const switchRoutes = (
        <Switch>
            {routes.map((prop, key) => {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            render={()=><prop.component/>}
                            key={key}
                        />
                    );
            })}
            <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
    );
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
        return window.location.pathname !== "/admin/maps";
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };


    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Dashboard"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                {getRoute() ? (
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                ) : (
                    <div className={classes.map}>{switchRoutes}</div>
                )}
                {getRoute() ? <Footer /> : null}

            </div>
        </div>
    );
}
