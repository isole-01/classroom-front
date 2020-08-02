import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import GridContainer from "components/Grid/GridContainer.js";


export default function Circular() {
    return (
        <GridContainer justify={"center"} style={{height: "60vh", alignContent: "center"}}><CircularProgress/>
        </GridContainer>
    )
}
