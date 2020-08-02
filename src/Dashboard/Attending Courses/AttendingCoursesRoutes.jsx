import React from "react";
import {Switch,Route,useRouteMatch} from "react-router-dom";
import FillTest from "./FillTest";
import CoursesPage from "./AttendingCoursesPage"
import AttendingCoursePage from "./AttendingCoursePage";
import ResultPage from "./ResultPage";

const AttendingCoursesRoutes=()=>{
    const match = useRouteMatch();
    return(
        <Switch>
            <Route exact path={match.path}  component={CoursesPage}/>
            <Route exact path={match.path+'/:courseId'} component={AttendingCoursePage}/>
            <Route exact path={match.path+'/:courseId/:examId/fill'} component={FillTest} />
            <Route exact path={match.path+'/:courseId+/:examId/result'} component={ResultPage}/>
        </Switch>

    );
};

export default AttendingCoursesRoutes;
