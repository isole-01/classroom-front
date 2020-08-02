import React from "react";

import GridContainer from "components/Grid/GridContainer.js";

export default function ErrorQuery({error}) {
    return(
        <GridContainer style={{marginLeft:"20px"}} direction={'column'}>
            <h3>Oops! Something Went Wrong!</h3>
            <h5 style={{marginLeft:"3px"}}>{error.message}</h5>
        </GridContainer>
    )
}
