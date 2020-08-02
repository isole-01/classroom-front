import React, { useState} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useParams} from "react-router-dom";
import moment from "moment";
import {gql, useQuery} from "@apollo/client";
import ErrorQuery from "../../myComponents/ErrorQuery";
import Circular from "../../myComponents/Circular";


const RESULT = gql`
    query ExamResultStu($examId:Int!){
        examResultStu(examId:$examId){
            title,
            duration,
            date,
            correctAnswers,
            sheet{
                score,
                answers,
            }
        }
    }
`;


export default function ResultPage() {
    const classes=1;
    const params = useParams();
    const [result, setResult] = useState({
        sheet:{
            answers:[]
        },
        correctAnswers:[]
    });
    const {loading, error} = useQuery(RESULT, {
        onCompleted: (data) => {
            setResult(data.examResultStu)
        },

        variables: {
            examId: parseInt(params.examId)
        }
    });


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
                            <h4 className={classes.cardTitleWhite}>{result.title}</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["", ""]}
                            tableData={
                                [
                                    ['Date:', moment(result.date).format('YYYY-MMM-DD')],
                                    ['Time:',moment(result.date).format("hh:mm a")],
                                    ['Duration:',result.duration],
                                    ['Score:',result.sheet.score]
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
                            <h4 className={classes.cardTitleWhite}>Answer Sheet</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table
                            hover
                            tableHeaderColor="primary"
                            tableHead={["#", "Your Answer", "Correct Answer"]}
                            tableData={
                                result.correctAnswers.map((answer,index) => ([index+1,result.sheet.answers[index],answer]))
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>


        </GridContainer>
    );
}
