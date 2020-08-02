import Dashboard from "@material-ui/icons/Dashboard";
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import MyCoursesRoutes from "./MyCourses/MyCoursesRoutes";
import AttendingCoursesRoutes from "./Attending Courses/AttendingCoursesRoutes";
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';const dashboardRoutes = [
    {
        path: "/home",
        name: "Home",
        rtlName: "لوحة القيادة",
        icon: HomeIcon,
        component: MyCoursesRoutes,
        layout: "/dashboard"
    },
    {
        path: "/teaching",
        name: "My Courses",
        rtlName: "لوحة القيادة",
        icon: CastForEducationIcon,
        component: MyCoursesRoutes,
        layout: "/dashboard"
    },
    {
        path: "/student",
        name: "Attending Courses",
        rtlName: "لوحة القيادة",
        icon: ClassIcon,
        component: AttendingCoursesRoutes,
        layout: "/dashboard"
    },



];

export default dashboardRoutes;
