import React from "react";

import {Route, Switch, Redirect} from "react-router-dom";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import MainDashboard from "./Dashboard/MainDashboard";
import EnrollPage from "./Dashboard/Attending Courses/EnrollPage";
import Stream from "./Pages/Stream";


const App = (props) => {
    return (
        <Switch>
            <Route path={'/dashboard'} render={(props)=>(localStorage.getItem("token")) ? (<MainDashboard {...props}/>) : <Redirect to={"/login"}/>}/>
            <Route path={'/login'}  render={(props)=>(localStorage.getItem("token")) ? (<Redirect to={"/dashboard"}/>) : <LoginPage {...props}/>}/>
            <Route path={'/register'} component={RegisterPage}/>
            <Route exact path={'/enroll/:encId'} component={EnrollPage}/>
            <Route path={'/stream'} component={Stream}/>

        </Switch>
    )
};

export default App;
