import { makeStyles, Divider, Paper, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import Names from "../components/appointments/Names";
import SearchBar from "../components/appointments/SearchBar";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import GlobalIDContext from "../context/UserID";

const GET_DOCTOR_APPOINTMENTS = gql`
	query($doctorID: ID!) {
		getDoctorAppointments(doctorID: $doctorID) {
			appointmentStartTime
			appointmentDate
			arrivalConfirmation
			checkupType
			studentID {
				gender
				studentName
				studentID
			}
			doctorID {
				officeNumber
			}
		}
	}
`;

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	replaceButton: {
		backgroundColor: "#1407C7",
		width: "5em",
		color: "#ffffff",
	},
	reschedule: {
		backgroundColor: "#07C759",
		width: "5em",
		color: "#ffffff",
	},
	nullApp: {
		position: "relative",
		left: "25%",
		width: "50%",
		height: "5em",
		top: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
});
export default function ManageAppointments() {
	const classes = useStyles();
	const { user } = useContext(GlobalIDContext);
	const [appointmentList, setAppointmentList] = useState([]);
	const { loading, error, data } = useQuery(GET_DOCTOR_APPOINTMENTS, {
		onError: (e) => {
			console.log(e);
		},
		onCompleted: (d) => {
			console.log(d);
			setAppointmentList(d.getDoctorAppointments);
		},
		// variables: { doctorID: "09876543" },
		variables: { doctorID: user },
	});

	if (loading) {
		return (
			<div style={{ position: "relative", left: "50%", top: "50%" }}>
				<Spinner color="#3036FF" />
			</div>
		);
	}

	return (
		<div className={classes.root}>
			<div
				style={{
					height: "5em",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<SearchBar />
			</div>
			<Divider />
			{appointmentList.length === 0 ? (
				<div
					style={{
						marginBottom: "48em",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "10em",
					}}>
					<Paper variant="outlined" className={classes.nullApp}>
						<Typography variant="h4">No appointmens booked Today</Typography>
					</Paper>
				</div>
			) : (
				appointmentList &&
				appointmentList.map(({ arrivalConfirmation, studentID, checkupType, doctorID }) => (
					<Names
						name={studentID.studentName}
						officeNumber={doctorID.officeNumber}
						id={studentID.studentID}
						checkupType={checkupType}
						arrivalConfirmation={arrivalConfirmation}
					/>
				))
			)}
		</div>
	);
}
