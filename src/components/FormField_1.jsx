import React from "react";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const colors={
    vibrant: {
        color1: '#f8e9a1',
        color2: '#f76c6c',
        color3: '#a8d0e6',
        color4: '#374785',
        color5: '#24305e',
    }
};

const TextField1 = withStyles({
    root: {
        '& label.Mui-focused': {
            color: colors.vibrant.color4,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.vibrant.color2,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colors.vibrant.color3,
                borderWidth: '2px'
            },
            '&:hover fieldset': {
                borderColor: colors.vibrant.color4,
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: colors.vibrant.color1,
            // },
        },
    },
})(TextField);

export default TextField1;