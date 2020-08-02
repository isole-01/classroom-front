import React, { useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "../../components/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link, useRouteMatch} from "react-router-dom";
import moment from "moment";
import {gql, useQuery} from "@apollo/client";
import ErrorQuery from "../../myComponents/ErrorQuery";
import styles from "../../myComponents/cardStyles";

const COURSES = gql`
    query OwnedCourses{
        ownedCourses{
            name,
            id,
            startdate,
        }
    }
`;

const useStyles = makeStyles(styles);

export default function TableList() {
    const [courses, setCourses] = useState([]);
    const {url} = useRouteMatch()
    const {loading, error} = useQuery(COURSES, {
        onCompleted: (data) => {
            setCourses(data.ownedCourses)
        }
    });


    const classes = useStyles();

    if (error) {
        return (
            <ErrorQuery error={error}/>
        )
    }

    if (loading)
        return (
            <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
            </GridContainer>
        );

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>My Courses</h4>
                            <RegularButton component={Link} to={url + '/createcourse'} color={'white'}
                                           round={true}>+</RegularButton>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Name", "Start Date", "", ""]}
                            tableData={
                                courses.map((course) => ([course.name, moment(course.startdate).format("YYYY-MM-DD"), '',
                                    <RegularButton component={Link} to={url + '/' + course.id}
                                                   color={"info"}>Show</RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
