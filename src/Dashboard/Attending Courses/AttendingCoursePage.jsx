import React, { useState} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from "../../components/CustomButtons/Button";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import moment from "moment";
import {gql, useQuery} from "@apollo/client";
import Circular from "../../myComponents/Circular";
import ErrorQuery from "../../myComponents/ErrorQuery";


const COURSE = gql`
    query Course($courseId:Int!){
        courseByIdStu(courseId:$courseId){
            name,
            identity,
            id,
            startdate,
            description,
            exams{
                upcomingExams{
                    id
                    title
                    date
                    duration
                }
                finishedExams{
                    id
                    title
                    date
                    duration
                }
            }
        }
    }
`;


export default function CoursePage() {
    const {url} = useRouteMatch()
    const params = useParams();
    const [course, setCourse] = useState({
        students: [], exams: {
            finishedExams: [],
            upcomingExams:[]
        }
    });
    const {loading, error} = useQuery(COURSE, {
        onCompleted: (data) => {
            setCourse(data.courseByIdStu)
        },
        variables: {
            courseId: parseInt(params.courseId)
        }
    });

    const classes = 1;

    if (error) {
        return <ErrorQuery error={error}/>
    }
    if (loading)
        return (
            <Circular/>
        );

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>{course.name}</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["", ""]}
                            tableData={
                                [
                                    ['Start Date:', moment(course.startdate).format('YYYY-MMM-DD')],
                                ]
                            }
                        />
                        <h3>Description:</h3>
                        <p>
                            {course.description}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>


            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>Finished Exams</h4>

                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Title", "Date","Time" ,"Duration(min)", ""]}
                            tableData={
                                course.exams.finishedExams.map((exam) => ([exam.title, moment(exam.date).format('YYYY-MM-DD'),moment(exam.date).format('hh:mm a '), exam.duration,
                                    <RegularButton
                                        component={Link}
                                        to={url+'/'+exam.id+'/result'}
                                        color={"info"}>Result</RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>Upcoming Exams</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Title", "Date", "Time", "Duration(min)",""]}
                            tableData={
                                course.exams.upcomingExams.map((exam) => ([exam.title, moment(exam.date).format('YYYY-MM-DD'), moment(exam.date).format('hh:mm a '),
                                    exam.duration,
                                    <RegularButton component={Link}
                                                   to={url+'/'+exam.id+'/fill'}
                                                   color={"info"}>
                                        Fill
                                    </RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
