import { makeStyles, Typography, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
	paperDiv: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginRight: "15%",
		marginLeft: "5%",
	},
	paper: {
		display: "flex",
		flexDirection: "rows",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "5em",
		// position: "relative",
		// left: "5%",
		marginLeft: "15%",
		marginRight: "15%",
		width: "95%",
		marginBottom: "1em",
	},
});
export default function Names({ namesList }) {
	const classes = useStyles();
	return (
		<div className={classes.paperDiv}>
			{namesList &&
				namesList.map(({ name, checkupType, id, officeNumber, arrivalConfirmation }) => (
					<Paper elevation={0} variant="outlined" className={classes.paper}>
						<Typography variant="h5">{id}</Typography>
						<Typography variant="h6">{name}</Typography>
						<Typography variant="h6">{checkupType}</Typography>
						<Typography variant="h6">{officeNumber}</Typography>
						<Typography
							variant="h6"
							style={{ color: arrivalConfirmation ? "#07C759" : "#FE0020" }}>
							{arrivalConfirmation ? "Confirmed" : "N/A"}
						</Typography>
					</Paper>
				))}
		</div>
	);
}
