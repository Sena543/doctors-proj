import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "react-activity/dist/react-activity.css";
import { Bounce } from "react-activity";
import { TypographyColor } from "./TypographyColor";
import { withRouter } from "react-router";

const CONFIRM_ARRIVAL = gql`
	mutation($studentID: String!) {
		confirmArrival(studentID: $studentID)
	}
`;

const useStyles = makeStyles({
	root: {
		width: "45%",
		position: "relative",
		top: "0em",
		left: "30em",
		display: "flex",
		flexDirection: "column",
		height: "50em",
		border: "3px solid #F1F3F6",
	},
	div: { display: "flex", flexDirection: "row", margin: "4%", justifyContent: "space-between" },
});

function SearchResults(props) {
	const classes = useStyles();
	const personData = props.history.location.state;
	const appointment = personData.appointmentList.sort((a, b) => b.appointmentDate - a.appointmentDate)[0];
	const [disableButton, setdisableButton] = useState(false);
	const [confirmArrival, { loading: arrivalConfirmation, data }] = useMutation(CONFIRM_ARRIVAL, {
		onCompleted: (response) => {
			// console.log(response);
			setdisableButton(true);
		},
	});
	return (
		<>
			<Card className={classes.root} variant="outlined">
				<div className={classes.div}>
					<Typography>Identification Number:</Typography>
					<Typography>{personData?.studentID}</Typography>
				</div>
				<div className={classes.div}>
					<Typography>Name</Typography>
					<Typography>{personData?.studentName}</Typography>
				</div>
				{/* <div className={classes.div}>
					<Typography>Residence:</Typography>
					<Typography>{personData?.hallOfResidence}</Typography>
				</div> */}
				<div className={classes.div}>
					<Typography>Purpose</Typography>
					<Typography>{appointment?.checkupType}</Typography>
				</div>
				<div className={classes.div}>
					<Typography>Doctor:</Typography>
					<Typography>{appointment?.doctorID?.doctorName}</Typography>
				</div>
				<div className={classes.div}>
					<Typography>Time:</Typography>
					<Typography>{appointment?.appointmentStartTime}</Typography>
				</div>
				<div className={classes.div}>
					<Typography>Office Number:</Typography>
					<Typography>{appointment?.doctorID?.officeNumber}</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						position: "relative",
						left: 30,
					}}>
					<img
						src={`${process.env.PUBLIC_URL}/warning.png`}
						width="30"
						height="30"
						alt="warining"
					/>
					{/* <Typography>D12</Typography> */}
					<TypographyColor style={{ marginLeft: 10 }}>
						Ensure to be there 30 minutes before time else appoinment would be cancelled
					</TypographyColor>
				</div>

				{arrivalConfirmation ? (
					<div style={{ position: "relative", left: "50%", top: "2em" }}>
						<Bounce color="#3036FF" />
					</div>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
							position: "relative",
							left: 30,
							top: 30,
						}}>
						<Button
							style={{ backgroundColor: "#FF0000", color: "#fff", marginLeft: "2em" }}
							variant="contained"
							onClick={() => props.history.push("/")}
							disableElevation>
							Back
						</Button>
						<Button
							style={{
								backgroundColor: disableButton ? "#C2CDD2" : "#07C759",
								color: "#fff",
								marginRight: "2em",
							}}
							onClick={() => {
								confirmArrival({ variables: { studentID: personData.studentID } });
								// setTimeout(() => {}, 2000);
								props.history.push("/");
							}}
							variant="contained"
							disabled={disableButton}
							disableElevation>
							Confirm
						</Button>
					</div>
				)}
			</Card>
		</>
	);
}

export default withRouter(SearchResults);
