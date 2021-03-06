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
import ErrorQuery from "../../myComponents/ErrorQuery";
import Circular from "../../myComponents/Circular";


const COURSE = gql`
    query Course($courseId:Int!){
        courseById(courseId:$courseId){
            name,
            identity,
            id,
            startdate,
            description,
            students{
                person{
                    email
                    name
                }
            }
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

const classes=1
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
            setCourse(data.courseById)
            console.log(data)
        },
        variables: {
            courseId: parseInt(params.courseId)
        }
    });

    if (loading)
        return (
            <Circular/>
        );
    if (error) {
        return <ErrorQuery error={error}/>
    }
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
                                    ['Invitation Link:', 'localhost:3000/enroll/'+course.identity]
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
                    <CardHeader color="info">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>Students</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["name", "email", ]}
                            tableData={
                                course.students.map((student) => ([student.person.name, student.person.email, '',
                                    ]))
                            }
                        />
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
                                        to={url+'/'+exam.id+'/results'}
                                        color={"info"}>Results</RegularButton>]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>Upcoming Exams</h4>
                            <RegularButton component={Link} to={url + '/addquiz'} color={'white'}
                                           round={true}>+</RegularButton>

                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["Title", "Date", "Time", "Duration(min)"]}
                            tableData={
                                course.exams.upcomingExams.map((exam) => ([exam.title, moment(exam.date).format('YYYY-MM-DD'), moment(exam.date).format('hh:mm a '),
                                    exam.duration]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
