import React, {useState} from "react";

import {Typography,} from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button"
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomInput from "../../components/CustomInput/CustomInput";
import { useParams} from "react-router-dom";

import Container from "@material-ui/core/Container";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import InputAdornment from "@material-ui/core/InputAdornment";
import {gql, useMutation} from '@apollo/client';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SuccessDialog from "../../myComponents/SuccessDialog";
import ErrorDialog from "../../myComponents/ErrorDialog";
import Circular from "../../myComponents/Circular";


const ColoredRadio = (props) => <Radio style={{color: "#9c27b0"}} {...props}/>;


const ADD_EXAM = gql`
    mutation addExam($title:String!,$courseId: Int!,$date:String!,$duration:Int!,$questions:[QuestionIn!]!) {
        addExam(courseId:$courseId,questions:$questions,title:$title,date:$date,duration:$duration) {
            id
        }
    }
`;


export default function AddExam() {
    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');
    const [modal, setModal] = React.useState(false);
    const [enrollModal, setEnrollModal] = React.useState(false);


    const params = useParams();
    const classes = 1;


    const [addExam, {loading}] = useMutation(ADD_EXAM,
        {
            onCompleted: () => {
                setEnrollModal(true)

            },
            onError: (error) => {
                setErrorMessage(error.message)
                setModal(true)
            }
        });


    const [questions, setQuestions] = useState([{
        answer: '0',
        text: "",
        choice_a: "",
        choice_b: "",
        choice_c: "",
        choice_d: "",
    }]);

    let dateValid = true;
    const [startDate, setStartDate] = React.useState(null);
    const handleStartDate = (e) => {
        if (typeof e === "string") {
            dateValid = false;
        }

        setStartDate(e)
    };

    const [duration, setDuration] = useState(30);
    const handleDuration = event => {
        setDuration(event.target.value);
    };
    const [name, setName] = useState('');
    const handleName = event => {
        setName(event.target.value);
    };


    const addQuestion = (e) => {
        setQuestions(questions.concat({
            answer: '0',
            text: "",
            choice_a: "",
            choice_b: "",
            choice_c: "",
            choice_d: "",
        }));
    };
    const handleChange = (e) => {
        const index = parseInt(e.target.name);
        let newQuestions = [...questions];

        newQuestions[index].text = e.target.value;
        setQuestions(newQuestions);
    };


    const handleChangeRadio = (e) => {
        const index = parseInt(e.target.name);
        let newQuestions = [...questions];
        newQuestions[index].answer = e.target.value;
        setQuestions(newQuestions);
    };
    const handleChangeChoices = (e) => {

        const inf = e.target.name.split('-');
        const index = parseInt(inf[0]);
        const choice = inf[1];
        let newQuestions = [...questions];
        newQuestions[index][choice] = e.target.value;
        setQuestions(newQuestions);
    };


    const handleDelete = (i) => {
        questions.splice(i, 1);
        let newQuestions = [...questions];
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const questionsOut = questions.map((question) => {
            return {
                text: question.text,
                answer: parseInt(question.answer),
                choices: [question.choice_a, question.choice_b, question.choice_c, question.choice_d]
            }
        });
        addExam({
            variables: {
                title: name,
                duration: parseInt(duration),
                date: startDate.toDate(),
                courseId: parseInt(params.courseId),
                questions: questionsOut
            }
        })
    };

    if(loading)
        return <Circular/>


    return (
        <form className={classes.root} onSubmit={handleSubmit}>

            <SuccessDialog
                modalOpen={enrollModal}
                setModalOpen={setEnrollModal}
                message={"Exam Was Created Successfully"}
            />

            <ErrorDialog
                modalOpen={modal}
                setModalOpen={setModal}
                errorMessage={errorMessage}
            />

            <Container>

                <Card className={classes.textCenter} style={{paddingTop: "30px"}}>
                    <CardHeader style={{marginTop: "-50px"}} color="primary"><h5>Test Information</h5></CardHeader>
                    <CardBody>
                        <GridContainer spacing={5}>
                            <GridItem xs={12} md={4}>
                                <CustomInput
                                    formControlProps={{fullWidth: true}}
                                    inputProps={{
                                        required:true,
                                        value: name,
                                        onChange: handleName
                                    }}
                                    required={true} labelText={"Test Title"}
                                />
                            </GridItem><GridItem xs={12} md={4} style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}>
                            <FormControl fullWidth style={{marginTop: "8px"}}>
                                <Datetime
                                    onChange={(e) => handleStartDate(e)}
                                    value={startDate}
                                    inputProps={{
                                        required:true,
                                        placeholder: "Start Date Picker Here",
                                        labelText: 'start date'
                                    }}
                                />
                            </FormControl>
                        </GridItem><GridItem xs={12} md={4}>
                            <CustomInput
                                labelText="Test Duration"
                                id="cashprice"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    required:true,
                                    type: "number",
                                    value: `${duration}`,
                                    onChange: (e) => {
                                        handleDuration(e)
                                    },
                                    endAdornment: (
                                        <InputAdornment>
                                            Minutes
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>

                <GridContainer spacing={2} className={classes.questions} container
                               direction={"column"}>
                    {
                        questions.map((question, index) =>
                            <GridItem className={classes.question} container direction={"column"}
                                      key={question.id}>
                                <Card>
                                    <CardContent>
                                        <GridItem xs={12}>
                                            <CustomInput
                                                formControlProps={{fullWidth: true}}
                                                inputProps={{name: `${index}`, onChange: handleChange}}
                                                required={true}
                                                labelText={`Question ${index + 1}`}
                                                value={question.text}
                                                onChange={handleChange}
                                            />
                                        </GridItem>

                                        <RadioGroup name={`${index}`} aria-label="gender" value={question.answer}
                                                    onChange={handleChangeRadio}>

                                            <GridItem xs={12} md={6}>
                                                <div style={{height: "93px", display: 'flex', flexDirection: 'row'}}>
                                                    <FormControlLabel value="0" label={'1'}

                                                                      control={question.answer === 'a' ?
                                                                          <ColoredRadio/> : <Radio/>}
                                                    />

                                                    <CustomInput

                                                        formControlProps={{fullWidth: true}}
                                                        inputProps={{
                                                            name: `${index}-choice_a`,
                                                            onChange: handleChangeChoices
                                                        }}
                                                        required={true}
                                                        labelText={`Option`}
                                                        value={question.choice_a}
                                                    />
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} md={6}>
                                                <div style={{height: "93px", display: 'flex', flexDirection: 'row'}}>

                                                    <FormControlLabel value="1" label={'2'}
                                                                      control={question.answer === 'b' ?
                                                                          <ColoredRadio/> : <Radio/>}
                                                    />

                                                    <CustomInput
                                                        formControlProps={{fullWidth: true}}
                                                        inputProps={{
                                                            name: `${index}-choice_b`,
                                                            onChange: handleChangeChoices
                                                        }}
                                                        required={true}
                                                        labelText={`Option`}
                                                        value={question.choice_a}
                                                    />
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} md={6}>
                                                <div style={{height: "93px", display: 'flex', flexDirection: 'row'}}>

                                                    <FormControlLabel value="2" label={'3'}
                                                                      control={question.answer === 'c' ?
                                                                          <ColoredRadio/> : <Radio/>}
                                                    />
                                                    <CustomInput
                                                        formControlProps={{fullWidth: true}}
                                                        inputProps={{
                                                            name: `${index}-choice_c`,
                                                            onChange: handleChangeChoices
                                                        }}
                                                        required={true}
                                                        labelText={`Option`}
                                                        value={question.choice_a}
                                                    />
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} md={6}>
                                                <div style={{height: "93px", display: 'flex', flexDirection: 'row'}}>

                                                    <FormControlLabel value="3" label={'4'}
                                                                      control={question.answer === 'd' ?
                                                                          <ColoredRadio/> :
                                                                          <Radio/>}
                                                    />
                                                    <CustomInput
                                                        formControlProps={{fullWidth: true}}
                                                        inputProps={{
                                                            name: `${index}-choice_d`,
                                                            onChange: handleChangeChoices
                                                        }}
                                                        required={true}
                                                        labelText={`Option`}
                                                        value={question.choice_a}
                                                    />
                                                </div>
                                            </GridItem>
                                        </RadioGroup>
                                    </CardContent>
                                    <CardActions>
                                        <Button color={'danger'} name={`${index}`} round size={"sm"}
                                                style={{}}
                                                onClick={() => handleDelete(index)}
                                        ><Typography>Delete</Typography></Button>
                                    </CardActions>
                                </Card>
                            </GridItem>
                        )
                    }
                    <br/>
                    <GridContainer direction={"row"} justify={"space-between"}>
                        <Button color={"info"} type={"submit"}
                        ><Typography>Submit</Typography></Button>
                        <Button size={"sm"} round color={"success"} onClick={(e) => addQuestion(e)}>
                            <Typography>Add Question</Typography>
                        </Button>
                    </GridContainer>
                </GridContainer>
            </Container>
        </form>

    )
}
