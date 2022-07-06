import { useLazyQuery, gql } from "@apollo/client";
// import SearchResults from "./SearchResults";
import { Bounce } from "react-activity";
import { Button, Card, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-activity/dist/react-activity.css";
import { withRouter } from "react-router";

const GET_USER_ID = gql`
	query($studentID: String!) {
		findStudentID(studentID: $studentID) {
			dateOfBirth
			email
			gender
			# hallOfResidence
			phoneNumber
			# roomNumber
			studentID
			studentName
			# studentType
			appointmentList {
				checkupType
				appointmentDate
				appointmentStartTime
				doctorID {
					doctorName
					officeNumber
				}
			}
		}
	}
`;

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		width: "50%",
		position: "relative",
		left: "30em",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "25em",
		marginTop: "8em",
	},
	textField: {
		width: "60%",
		marginBottom: "5em",
		// marginLeft: "10em",
	},
	form: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	selectDiv: {
		width: "20em",
		display: "flex",
		marginBottom: "2em",
		flexDirection: "row",
	},
	select: {
		width: "10em",
	},
});

function Search(props) {
	const { history } = props;
	const [getUserIDData, { loading, data }] = useLazyQuery(GET_USER_ID, {
		// fetchPolicy: "no-cache",
		onCompleted: (d) => {
			console.log(d.findStudentID);
			if (d) {
				history.push({ pathname: "/confirm-appointment", state: d.findStudentID });
			}
		},
	});

	useEffect(() => {}, [data]);

	const styles = useStyles();
	const [IDNumber, setIDNumber] = useState("");
	const [month, setMonth] = useState("Month");
	const [errorMsgs, setErrorMgs] = useState({
		showMonthError: false,
		showIDError: false,
		idErrorMsgs: "",
	});

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const submitInputID = () => {
		setErrorMgs({ ...errorMsgs, showIDError: false });
		if (!IDNumber) {
			setErrorMgs({
				...errorMsgs,
				showIDError: true,
				idErrorMsgs: "Identification Number is required",
			});
			return;
		}

		if (IDNumber.length < 8) {
			setErrorMgs({
				...errorMsgs,
				showIDError: true,
				idErrorMsgs: "Incorrect ID number. Please check and try again",
			});
			return;
		}
		getUserIDData({ variables: { studentID: IDNumber } });
	};

	const submitInputMonth = () => {};

	const renderMonthList = () => {
		return months.map((item, index) => {
			return (
				<option key={item} style={{ height: "2em" }} value={index}>
					{item}
				</option>
			);
		});
	};
	return (
		<Card variant="outlined" className={styles.container}>
			<form noValidate className={styles.form}>
				<TextField
					error={errorMsgs.showIDError}
					helperText={errorMsgs.showIDError ? errorMsgs.idErrorMsgs : null}
					className={styles.textField}
					value={IDNumber}
					label="Search By Identification Number"
					onChange={(e) => {
						if (errorMsgs.showIDError) {
							setErrorMgs({ ...errorMsgs, showIDError: false });
						}
						setIDNumber(e.target.value);
					}}
				/>
				<div className={styles.selectDiv}>
					<Typography>Select Month:</Typography>
					<select
						value={month}
						onChange={(e) => setMonth(e.target.value)}
						className={styles.select}>
						{renderMonthList()}
					</select>
				</div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					{loading ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Bounce color="#3036FF" />
						</div>
					) : (
						<div
							className={{
								...styles.selectDiv,
								height: "4em",
								position: "relative",
								top: "10em",
							}}>
							<Button
								style={{ marginRight: "1em" }}
								onClick={submitInputID}
								disableFocusRipple
								color="primary"
								variant="contained">
								Search By ID
							</Button>
							<Button
								onClick={submitInputMonth}
								disableFocusRipple
								color="primary"
								variant="contained">
								Search By Month
							</Button>
						</div>
					)}
				</div>
			</form>
		</Card>
	);
}

export default withRouter(Search);
