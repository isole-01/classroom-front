import React from "react";
import {Container} from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import extendedTablesStyle from "../../assets/jss/material-dashboard-pro-react/views/extendedTablesStyle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RegularButton from "../../components/CustomButtons/Button";
import GridItem from "../../components/Grid/GridItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {gql, useMutation} from "@apollo/client";
import ErrorDialog from "../../myComponents/ErrorDialog";
import SuccessDialog from "../../myComponents/SuccessDialog";
import Circular from "../../myComponents/Circular";

const CREATE_COURSE = gql`
    mutation createCourse($name:String!,$startDate:String!,$description:String) {
        createCourse(name: $name,startDate: $startDate,description:$description) {
            id
        }
    }
`;


const useStyles = makeStyles(extendedTablesStyle);


const CreateCourse = () => {
    const [name, setName] = React.useState("");
    const [enrollModal, setEnrollModal] = React.useState(false);
    const [dateValid, setDateValid] = React.useState(true);
    const [startDate, setStartDate] = React.useState(null);

    const [createCourse, { loading}] = useMutation(CREATE_COURSE,
        {
            onCompleted: () => {
                setEnrollModal(true)
                setName("")
                setDescription("")
            },
            onError: (error) => {
                setErrorMessage(error.message)
                setErrorModal(true)
            }
        });


    const handleStartDate = (e) => {
        if (typeof e === "string") {
            setDateValid(false);
        }

        setStartDate(e)
    };


    const handleName = (e) => {
        setName(e.target.value)
    };


    const [description, setDescription] = React.useState();
    const handleDescription = (e) => {
        setDescription(e.target.value)
    };


    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');
    const [errorModal, setErrorModal] = React.useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        createCourse({
            variables: {
                name,
                description,
                startDate: startDate
            }
        })

    };


    const classes = useStyles();


    if (loading) {
        return <Circular/>
    }
    return (
        <Container>
            <GridContainer direction={"column"}>
                <ErrorDialog
                    modalOpen={errorModal}
                    setModalOpen={setErrorModal}
                    errorMessage={errorMessage}
                />
                <SuccessDialog
                    message={"Course Was Created Successfully"}
                    modalOpen={enrollModal}
                    setModalOpen={setEnrollModal}
                />

                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Create Course</h4>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <GridContainer
                                direction={"row"}
                                jutify={"space-between"}
                                style={{alignContent: "center"}}>

                                <GridItem style={{width: "40vw"}}>
                                    <CustomInput
                                        labelText="Title"
                                        id="title"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            required: true,
                                            type: "text",
                                            value: `${name}`,
                                            onChange: (e) => {
                                                handleName(e)
                                            },
                                        }}
                                    />
                                </GridItem>


                            </GridContainer>
                            <GridContainer direction={"row"} style={{marginTop: "2vh"}}>
                                <GridItem style={{width: "40vw",}}>
                                    <div>
                                        <InputLabel className={classes.label}>
                                            Start Date
                                        </InputLabel>
                                        <br/>
                                        <FormControl fullWidth>
                                            <Datetime
                                                timeFormat={false}
                                                onChange={(e) => handleStartDate(e)}
                                                value={startDate}
                                                inputProps={{
                                                    required: true,
                                                    placeholder: "Start"
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </GridItem>
                            </GridContainer>


                            <GridContainer direction={"row"} style={{marginTop: "2vh"}}>
                                <GridItem style={{width: "60vw"}}>
                                    <TextareaAutosize rowsMin={4}
                                                      style={{
                                                          borderColor: "#9c27b0",
                                                          borderRadius: "5px",
                                                          borderWidth: "1px",
                                                          width: "100%",
                                                          marginTop: "3vh",
                                                          height: "20vh"
                                                      }}
                                                      value={description}
                                                      onChange={handleDescription}
                                                      aria-label="maximum height"
                                                      placeholder="Course Description"/>
                                </GridItem>
                            </GridContainer>

                            <RegularButton style={{height: "50px", marginTop: "4vh"}}
                                           color={"info"}
                                           type={"submit"}
                            >Create</RegularButton>
                        </form>
                    </CardBody>
                </Card>


            </GridContainer>
        </Container>
    )
};
export default CreateCourse;

