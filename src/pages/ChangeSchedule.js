import { useMutation, useQuery } from "@apollo/client";
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

const UPDATE_WORKING_HOURS = gql`
	mutation($doctorID: ID!, $timesAvailable: [String]) {
		updateWorkingHours(doctorID: $doctorID, timesAvailable: $timesAvailable) {
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
			setworkingHours(d?.getWorkingHours?.timesAvailable);
		},
	});
	const [updateWorkingTimes] = useMutation(UPDATE_WORKING_HOURS, {
		onCompleted: (d) => {
			// setworkingHours(d?.updateWorkingHours?.timesAvailable);
		},
	});
	const [workingHours, setworkingHours] = useState([]);
	const [times, setTimes] = useState("6:00-7:00");
	const classes = useStyles();

	const timeList = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 1, 2, 3, 4, 5];

	if (loading) {
		<Typography>Fetching data</Typography>;
	}
	if (error) {
		console.error(error);
	}

	const updateTimes = (time) => {
		let findTimeIndex = (element) => element === time;
		let timesAvailable = [...workingHours];
		const index = workingHours.findIndex(findTimeIndex);
		timesAvailable[index] = times;
		setworkingHours(timesAvailable);
		updateWorkingTimes({ variables: { doctorID: user, timesAvailable: timesAvailable } });
	};

	const renderTimes = timeList.map((t) => (
		<option key={t} style={{ height: "2em" }} value={`${t}:00-${t + 1}:00`}>
			{`${t}:00-${t + 1}:00`}
		</option>
	));
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
						workingHours.map((time) => (
							<div style={{ display: "flex", flexDirection: "row", margin: "2em" }}>
								<Grid item md="auto" xs="auto">
									<li
										style={{
											position: "relative",
											top: "10px",
											marginLeft: "2em",
											marginRight: "10em",
										}}>
										{time}
									</li>
								</Grid>
								<Grid item md="auto" xs="auto" xl="auto">
									<Button onClick={() => updateTimes(time)} className={classes.button}>
										Replace
									</Button>
								</Grid>
							</div>
						))}
				</ul>
			</Grid>
			<div>
				<select value={times} onChange={(e) => setTimes(e.target.value)} className={classes.select}>
					{renderTimes}
				</select>
			</div>
		</div>
	);
}
