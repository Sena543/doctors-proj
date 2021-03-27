import { makeStyles, Typography, Paper, Grid } from "@material-ui/core";
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
		marginLeft: "15%",
		marginRight: "15%",
		width: "95%",
		marginBottom: "2em",
	},
});
export default function Names({ name, officeNumber, arrivalConfirmation, checkupType, id }) {
	const classes = useStyles();
	const gridSpacingxs = 2;
	return (
		<div className={classes.paperDiv}>
			{/* {namesList &&
				namesList.map(({ name, checkupType, id, officeNumber, arrivalConfirmation }) => ( */}
			<Paper elevation={0} variant="outlined" className={classes.paper}>
				<Grid container direction="row">
					{/* <Grid item xs={2}></Grid> */}
					<Grid item xs={gridSpacingxs}>
						<Typography variant="h5">{id}</Typography>
					</Grid>
					<Grid item xs={gridSpacingxs + 1}>
						<Typography variant="h6">{name}</Typography>
					</Grid>
					<Grid item xs={gridSpacingxs}>
						<Typography variant="h6">{checkupType}</Typography>
					</Grid>
					<Grid item xs={gridSpacingxs}>
						<Typography variant="h6">{officeNumber}</Typography>
					</Grid>
					<Grid item xs={gridSpacingxs}>
						<Typography
							variant="h6"
							style={{ color: arrivalConfirmation ? "#07C759" : "#FE0020" }}>
							{arrivalConfirmation ? "Confirmed" : "N/A"}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			{/* ))} */}
		</div>
	);
}
