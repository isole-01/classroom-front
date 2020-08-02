import React from "react";
import {Switch,Route,useRouteMatch} from "react-router-dom";
import AddQuiz from "./AddQuiz";
import CoursesPage from "./MyCoursesPage";
import CreateCourse from "./CreateCourse";
import CoursePage from "./CoursePage";
import ResultsPage from "./ResultsPage";

const MyCoursesRoutes=()=>{
    const match = useRouteMatch();
    return(
        <Switch>
            <Route exact path={match.path+'/:courseId/addquiz'} component={AddQuiz}/>
            <Route exact path={match.path}  component={CoursesPage}/>
            <Route exact path={match.path+'/createcourse'} component={CreateCourse}/>
            <Route exact path={match.path+'/:courseId'} component={CoursePage}/>
            <Route exact path={match.path+'/:courseId/:examId/results'} component={ResultsPage}/>
        </Switch>

    );
};

export default MyCoursesRoutes;
