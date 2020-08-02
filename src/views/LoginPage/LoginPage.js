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
import ErrorDialog from "../../myComponents/ErrorDialog";


import image from "assets/img/bg7.jpg";
import {Link as Rlink} from "react-router-dom";
import {Link} from "@material-ui/core";


import {gql, useLazyQuery} from '@apollo/client';
import {useHistory, useLocation} from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress";


//login query
const LOGIN = gql`
    query login($email: String!,$password: String!) {
        login(email: $email,password:$password)
    }
`;

const useStyles = makeStyles(styles);

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LoginPage(props) {
    const h = useHistory()
    const classes = useStyles();
    const goBack = useQuery().get('goback')
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const [modalOpen, setModalOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Wrong Information');

    const [login, {loading}] = useLazyQuery(LOGIN, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.login)
            if (goBack)
                h.goBack();
            else
                h.push('/dashboard')
        },
        onError: (error) => {
            setErrorMessage(error.message)
            setModalOpen(true)
        }
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            variables: {
                email,
                password
            }
        })
    };
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    setTimeout(function () {
        setCardAnimation("");
    }, 700);

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

                    <ErrorDialog modalOpen={modalOpen}
                                 setModalOpen={setModalOpen}
                                 setErrorMessage={setErrorMessage}
                                 errorMessage={errorMessage}/>

                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>

                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                required: true,
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
                                                fullWidth: true,

                                            }}
                                            inputProps={{
                                                type: "password",
                                                required: true,
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
                                                Login
                                            </Button>
                                            {loading ? <GridContainer justify={"center"} style={{
                                                alignContent: "center",
                                                marginDown: "4px"
                                            }}><CircularProgress/>
                                            </GridContainer> : null}
                                            <Rlink to={'/register'}>
                                                <Link fullWidth style={{display: "block"}}>
                                                    Don't have an account? Sign Up
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
};
