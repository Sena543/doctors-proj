import { useQuery } from "@apollo/client";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import Names from "../components/appointments/Names";
import SearchBar from "../components/appointments/SearchBar";
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
export default function Appointments() {
	const classes = useStyles();
	const { user } = useContext(GlobalIDContext);
	const [appointmentList, setAppointmentList] = useState();
	const { loading, error, data } = useQuery(GET_DOCTOR_APPOINTMENTS, {
		onError: (e) => {
			console.log(e);
		},
		onCompleted: (d) => {
			console.log(d);
			setAppointmentList(d.getDoctorAppointments);
		},
		variables: { doctorID: "09876543" },
		// variables: { doctorID: user },
	});
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDate = new Date();
	const dayNum = currentDate.getDay();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();

	if (loading) {
		<Typography>Loading data</Typography>;
	}
	// console.log(data);o
	if (error) {
		console.log(error);
	}
	return (
		<div className={classes.root}>
			<div style={{ height: "5em", justifyContent: "center", alignItems: "center" }}>
				<SearchBar />
			</div>
			<Divider />
			<div style={{ display: "flex", justifyContent: "space-between", height: "2em", margin: "2em" }}>
				<Typography style={{ position: "relative", left: 310, color: "#3036FF" }}>
					{days[dayNum]} {`${day}/${month}/${year}`}
				</Typography>
				<Typography style={{ position: "relative", right: 110, color: "#3036FF" }}>9:00</Typography>
			</div>
			{appointmentList &&
				appointmentList.map(({ arrivalConfirmation, studentID, checkupType, doctorID }) => (
					<Names
						name={studentID.studentName}
						officeNumber={doctorID.officeNumber}
						id={studentID.studentID}
						checkupType={checkupType}
						arrivalConfirmation={arrivalConfirmation}
					/>
				))}
		</div>
	);
}
