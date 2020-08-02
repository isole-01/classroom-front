import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import {Link as Rlink, Redirect} from "react-router-dom";
import { Link} from "@material-ui/core";


import {gql, useMutation} from '@apollo/client';
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorDialog from "../myComponents/ErrorDialog";
import SuccessDialog from "../myComponents/SuccessDialog";

const SIGN_UP = gql`
    mutation createUser($email: String!,$password:String!,$name:String!) {
        createUser(email: $email,password: $password,name:$name) {
            id
        }
    }
`;



const useStyles = makeStyles(styles);


function Page(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [errorModal, setErrorModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');
    const [enrollModal, setEnrollModal] = React.useState(false);
    const [createUser, {loading}] = useMutation(SIGN_UP,
        {
            onCompleted:()=>{
                setEnrollModal(true)

            },
            onError:(error)=>{
                setErrorMessage(error.message)
                setErrorModal(true)
            }
        });

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser({
            variables: {
                email,
                password,
                name
            }
        })

    };


    const [password, setPassword] = React.useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };
    const handleName = (e) => {
        setName(e.target.value)
    };

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Class Room"
                rightLinks={<HeaderLinks/>}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">

                        <SuccessDialog
                            message={'Account Was Created Successfully'}
                            modalOpen={enrollModal}
                            setModalOpen={setEnrollModal}
                        />

                        <ErrorDialog modalOpen={errorModal}
                                     setModalOpen={setErrorModal}
                                     errorMessage={errorMessage}
                                     setErrorMessage={setErrorMessage}
                        />

                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Register</h4>
                                        <div className={classes.socialLine}>

                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Name"
                                            id="name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                required:true,
                                                value: `${name}`,
                                                onChange: (e) => {
                                                    handleName(e)
                                                },
                                            }}
                                        />
                                        <CustomInput

                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                required:true,
                                                type: "email",
                                                value: `${email}`,
                                                onChange: (e) => {
                                                    handleEmail(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                required:true,
                                                type: "password",
                                                value: `${password}`,
                                                onChange: (e) => {
                                                    handlePassword(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <GridContainer direction={"column"}>
                                            <Button type={"submit"} simple color="primary" size="lg">
                                                Register
                                            </Button>

                                            {loading ? <GridContainer justify={"center"} style={{
                                                alignContent: "center",
                                                marginDown: "4px"
                                            }}><CircularProgress/>
                                            </GridContainer> : null}

                                            <Rlink to={'/login'}>
                                                <Link fullWidth style={{display: "block"}}>
                                                    Login To Your Account
                                                </Link>
                                            </Rlink>
                                        </GridContainer>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont/>
            </div>
        </div>
    );
}

export default function RegisterPage(probs) {
    const [toLogin, setToLogin] = React.useState(false);

    if (toLogin)
        return <Redirect to={'/login'}/>;
    return <Page setToLogin={setToLogin}/>

}

