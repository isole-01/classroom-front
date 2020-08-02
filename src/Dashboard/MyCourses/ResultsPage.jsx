import React, { useState} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {useParams} from "react-router-dom";
import moment from "moment";
import {gql, useQuery} from "@apollo/client";
import Circular from "../../myComponents/Circular";
import ErrorQuery from "../../myComponents/ErrorQuery";


const EXAM_BY_ID_OWNER = gql`
    query examByIdOwner($examId:Int!){
        examByIdOwner(examId:$examId){
            title,
            duration,
            date,
            answersheets{
                score,
                student{
                    person{
                        email,
                         name
                    }
                }
            },
        }
    }
`;


export default function ResultsPage() {
    const params = useParams();
    const [exam, setExam] = useState({
        answersheets:[]
    });
    const {loading, error} = useQuery(EXAM_BY_ID_OWNER, {
        onCompleted: (data) => {
            setExam(data.examByIdOwner)
        },
        onError:()=>{
            console.log('yiw')
        },
        variables: {
            examId: parseInt(params.examId)
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
                            <h4 className={classes.cardTitleWhite}>{exam.title}</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["", ""]}
                            tableData={
                                [
                                    ['Start Date:', moment(exam.date).format('YYYY-MMM-DD')],
                                    ['Time:',moment(exam.date).format("hh:mm a")],
                                    ['Duration',exam.duration]
                                ]
                            }
                        />

                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{display: "flex", justifyContent: "space-between", direction: "row"}}>
                            <h4 className={classes.cardTitleWhite}>Students</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["name", "email", "score"]}
                            tableData={
                                exam.answersheets.map((answersheet) => ([answersheet.student.person.name, answersheet.student.person.email,
                                    answersheet.score,
                              ]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>


        </GridContainer>
    );
}
