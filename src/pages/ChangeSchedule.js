import { useQuery } from "@apollo/client";
import { Button, makeStyles, Typography, Grid } from "@material-ui/core";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import GlobalIDContext from "../context/UserID";

const GET_WORKING_HOURS = gql`
	query($doctorID: ID!) {
		getWorkingHours(doctorID: $doctorID) {
			timesAvailable
		}
	}
`;

const useStyles = makeStyles({
	title: {
		backgroundColor: "#fff",
		width: "30%",
		height: "4em",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		left: "25%",
		marginTop: "5em",
	},
	button: {
		backgroundColor: "#1407C7",
		height: "2em",
		color: "#fff",
		marginTop: 5,
		borderRadius: 0,
	},
	typo: {
		position: "relative",
		top: ".5em",
	},
});

export default function ChangeSchedule() {
	const { user } = useContext(GlobalIDContext);
	const { loading, error, data } = useQuery(GET_WORKING_HOURS, {
		variables: { doctorID: user },
		onCompleted: (d) => {
			console.log(d);
			setworkingHours(d?.getWorkingHours?.timesAvailable);
		},
	});
	const [workingHours, setworkingHours] = useState([]);
	const [upDateTimes, setUpdateTimes] = useState(workingHours);
	const classes = useStyles();

	if (loading) {
		<Typography>Fetching data</Typography>;
	}
	if (error) {
		console.error(error);
	}
	return (
		<div>
			<div className={classes.title}>
				<Typography className={classes.typo} variant="h5">
					Change Schedule
				</Typography>
			</div>
			<Grid container style={{ display: "flex", position: "relative", left: "10em", width: "80%" }}>
				<ul>
					{workingHours &&
						workingHours.map((times) => (
							<div style={{ display: "flex", flexDirection: "row", margin: "2em" }}>
								<Grid item md="auto" xs="auto">
									<li
										style={{
											position: "relative",
											top: "10px",
											marginLeft: "2em",
											marginRight: "10em",
										}}>
										{times}
									</li>
								</Grid>
								<Grid item md="auto" xs="auto" xl="auto">
									<Button className={classes.button}>Replace</Button>
								</Grid>
							</div>
						))}
				</ul>
			</Grid>
		</div>
	);
}
