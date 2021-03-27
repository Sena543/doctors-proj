import { makeStyles, Button, Divider } from "@material-ui/core";
import React from "react";
import Names from "../components/appointments/Names";
import SearchBar from "../components/appointments/SearchBar";

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
});
export default function ManageAppointments() {
	const classes = useStyles();
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
			{namesList &&
				namesList.map(({ name, officeNumber, arrivalConfirmation, id, checkupType }) => (
					<>
						<Names
							name={name}
							officeNumber={officeNumber}
							id={id}
							checkupType={checkupType}
							arrivalConfirmation={arrivalConfirmation}
						/>
						<div
							style={{
								display: "flex",
								justifyContent: "space-evenly",
								position: "relative",
								bottom: 20,
							}}>
							<Button className={classes.replaceButton}>Replace</Button>
							<Button className={classes.reschedule}>Replace</Button>
							{/* <Button style={{ width: "1em", backgroudColor: "#1407C7" }}>Replace</Button> */}
						</div>
					</>
				))}
		</div>
	);
}
