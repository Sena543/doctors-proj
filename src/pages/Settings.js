import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
// import Login from "./Login";

const useStyles = makeStyles({
	paper: {
		width: "25em",
		height: "5em",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "5em",
	},
	div: {
		width: "50%",
		position: "relative",
		left: "20%",
		top: "10em",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	typography: {
		marginTop: "6%",
	},
	link: {
		textDecoration: "none",
		color: "#000",
	},
});
export default function Settings() {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.div}>
				<Paper className={classes.paper} variant="outlined">
					<Typography variant="h5" className={classes.typography}>
						<Link to="/settings/change-schedule" className={classes.link}>
							Change Schedule
						</Link>
					</Typography>
				</Paper>
				<Paper className={classes.paper} variant="outlined">
					<Typography variant="h5" className={classes.typography}>
						Account Settings
					</Typography>
				</Paper>
			</div>
			<div className={classes.div}>
				<Paper className={classes.paper} variant="outlined">
					<Typography variant="h5" className={classes.typography}>
						Cancel Appointment
					</Typography>
				</Paper>
				<Paper className={classes.paper} variant="outlined">
					<Button
						onClick={() => {
							sessionStorage.removeItem("auth_token");
							window.location = "/login";
						}}
						className={classes.typography}>
						<Typography variant="h6">Logout</Typography>
					</Button>
				</Paper>
			</div>
		</div>
	);
}
