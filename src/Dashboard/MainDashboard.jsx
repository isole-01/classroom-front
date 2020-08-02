import React from "react";
import Dashboard from "../Dashboard";
import routes from './dashboardRoutes'

export default function StudentDashboard(props) {
    return(
        <Dashboard routes={routes} {...props}/>
    )
}
