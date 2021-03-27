import { Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Names from "../components/appointments/Names";
import SearchBar from "../components/appointments/SearchBar";

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
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDate = new Date();
	const dayNum = currentDate.getDay();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();

	const namesList = [
		{
			id: "12345678",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: true,
		},
		{
			id: "98765432",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: true,
		},
		{
			id: "0987890",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: true,
		},
		{
			id: "13213",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: true,
		},
		{
			id: "123434",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: null,
		},
		{
			id: "32332324",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: true,
		},
		{
			id: "97845",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: null,
		},
		{
			id: "97845",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: null,
		},
		{
			id: "97845",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: null,
		},
		{
			id: "97845",
			name: "Clark Kent",
			checkupType: "x-ray",
			officeNumber: "B9",
			arrivalConfirmation: null,
		},
	];
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
			{namesList &&
				namesList.map(({ name, officeNumber, arrivalConfirmation, id, checkupType }) => (
					<Names
						name={name}
						officeNumber={officeNumber}
						id={id}
						checkupType={checkupType}
						arrivalConfirmation={arrivalConfirmation}
					/>
				))}
		</div>
	);
}
