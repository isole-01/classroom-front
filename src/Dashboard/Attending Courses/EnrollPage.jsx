import React, {useEffect, useState} from "react";
import {Container} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import {useHistory,useParams,Redirect} from 'react-router-dom'
import Circular from "../../myComponents/Circular";
import ErrorQuery from "../../myComponents/ErrorQuery";

const ENROLL = gql`
    mutation Enroll($identifier: String!) {
        enroll(identifier: $identifier){
            id
        } 
    }
`;

export default function () {
    const params = useParams()
    const [enroll, {loading,error}] = useMutation(ENROLL,{

    });
    const h=useHistory()
    const [message,setMessage]=useState('You are enrolled successfully!');

    useEffect(() => {
        enroll({
            variables: {
                identifier: params.encId
            }
        })
    },[]);
    const isAuth = localStorage.getItem('token');
    if (isAuth) {
        if(error){
            return <ErrorQuery error={error}/>
        }
        if (loading)
            return (
                <Circular/>
            )
        return (
            <Container>
                <h5>
                {message}
                </h5>
            </Container>
        )
    }
    h.push('/login?goback=1')
    return <Redirect to={'/login?goback=1'}/>
}
