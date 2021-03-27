import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

// const CustomTextField = withStyles({
// 	root: {
// 		"& label.Mui-focused": {
// 			color: "green",
// 		},
// 		"& .MuiInput-underline:after": {
// 			borderBottomColor: "green",
// 		},
// 		"& .MuiOutlinedInput-root": {
// 			"& fieldset": {
// 				borderColor: "red",
// 			},
// 			"&:hover fieldset": {
// 				borderColor: "yellow",
// 			},
// 			"&.Mui-focused fieldset": {
// 				borderColor: "green",
// 			},
// 		},
// 	},
// })(TextField);

const useStyles = makeStyles({
	root: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	textField: {
		width: "50%",
		borderColor: "#F1F3F6",
		margin: 10,
	},
});
export default function SearchBar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<TextField
				className={classes.textField}
				variant="outlined"
				label="Search By Identification Number"
				InputProps={{ style: { borderRadius: "10em", borderColor: "#F1F3F6" } }}
			/>
		</div>
	);
}
