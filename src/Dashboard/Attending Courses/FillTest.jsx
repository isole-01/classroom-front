import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import {Typography} from "@material-ui/core";
import RegularButton from "../../components/CustomButtons/Button";
import {useParams} from "react-router-dom"
import {gql, useMutation, useQuery} from "@apollo/client";
import Countdown from "../../myComponents/CountDown";
import moment from "moment";
import ErrorQuery from "../../myComponents/ErrorQuery";
import Circular from "../../myComponents/Circular";
import ErrorDialog from "../../myComponents/ErrorDialog";
import SuccessDialog from "../../myComponents/SuccessDialog";

const ColoredRadio = (props) => <Radio style={{color: "#9c27b0"}} {...props}/>;


const GET_EXAM = gql`
    query Exam($examId:Int!){
        examById(examId:$examId){
            title,
            duration,
            id,
            date,
            remainingTime,
            questions{
                id,
                text,
                choices,
                answer
            }
        }
    }
`;

const FILL_EXAM = gql`
    mutation fillExam($examId:Int!,$answers:[Int!]!) {
        fillExam(examId:$examId,answers:$answers){
            id
        }
    }
`;




export default function FillTest() {
    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');
    const [modal, setModal] = React.useState(false);
    const [enrollModal, setEnrollModal] = React.useState(false);


    const [fillExam,dot] = useMutation(FILL_EXAM,
        {
            onCompleted: () => {
                setEnrollModal(true)
            },
            onError: (error) => {
                setErrorMessage(error.message)
                setModal(true)
            }
        });
    const loading2=dot.loading


    const [exam, setExam] = useState({});
    const [questions, setQuestions] = useState([])
    const params = useParams()
    const handleChangeRadio = (e) => {
        const index = parseInt(e.target.name);
        let newQuestions = [...questions];
        newQuestions[index].answer = e.target.value;
        setQuestions(newQuestions);
    };

    const {loading, error} = useQuery(GET_EXAM, {
        onCompleted: (data) => {
            setExam(data.examById)
            let q = data.examById.questions.map((question) => {
                return {
                    text: question.text,
                    choices: question.choices,
                    answer: '0'
                }
            });
            setQuestions(q)
        },
        variables: {
            examId: parseInt(params.examId)
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const answers=questions.map((question)=>parseInt(question.answer))
        fillExam({
            variables: {
                examId:parseInt(params.examId),
                answers:answers
            }
        })
    };

    if(error){
        return (
            <ErrorQuery error={error} />
        )
    }

    if (loading || loading2){
        return <Circular/>
    }

    return (
        <Container maxWidth={false}>
            <ErrorDialog
                errorMessage={errorMessage}
                setModalOpen={setModal}
                modalOpen={modal}
            />
            <SuccessDialog
                message={"Your sheet was submitted successfully"}
                modalOpen={enrollModal}
                setModalOpen={setEnrollModal}
            />
            <Card style={{paddingTop: "30px"}}>
                <CardHeader style={{marginTop: "-50px"}} color="info">{exam.title}</CardHeader>
                <CardBody>
                    <GridContainer style={{display:"flex",justifyContent:"center"}} spacing={5}>
                        <div >
                        <Countdown timeTillDate={moment(exam.date).add(exam.duration,'minutes')}
                        />
                        </div>
                    </GridContainer>
                </CardBody>
            </Card>

            <form onSubmit={handleSubmit}>
                {questions.map((question, qindex) => {
                    return (
                        <Card>
                            <CardBody>
                                <Typography style={{marginLeft: "-3px"}}>{question.text}</Typography>
                                <br/>
                                <GridContainer style={{marginLeft: "7px"}} direction={"column"}>
                                    <RadioGroup name={qindex} value={question.answer} onChange={handleChangeRadio}>
                                        <FormControlLabel value="0"
                                                          control={question.answer === '0' ? <ColoredRadio/> : <Radio/>}
                                                          label={question.choices[0]}/>
                                        <FormControlLabel value="1"
                                                          control={question.answer === '1' ? <ColoredRadio/> : <Radio/>}
                                                          label={question.choices[1]}/>
                                        <FormControlLabel value="2"
                                                          control={question.answer === '2' ? <ColoredRadio/> : <Radio/>}
                                                          label={question.choices[2]}/>
                                        <FormControlLabel value="3"
                                                          control={question.answer === '3' ? <ColoredRadio/> : <Radio/>}
                                                          label={question.choices[3]}/>
                                    </RadioGroup>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    )
                })}
                <br/>
                <RegularButton type={'submit'} color={"info"}>
                    <Typography>Submit</Typography>
                </RegularButton>
            </form>
        </Container>
    )
}
