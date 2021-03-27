import { Container, Divider, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import SearchBar from "../components/appointments/SearchBar";

const useStyles = makeStyles({
	paper: {
		display: "flex",
		flexDirection: "rows",
		justifyContent: "space-between",
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
	console.log(dayNum);
	return (
		<div>
			<div>
				<SearchBar />
				<Divider />
			</div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>
					{days[dayNum]} {`${day}/${month}/${year}`}
				</Typography>
				<Typography>9:00</Typography>
			</div>
			<div>
				<Paper elevation={0} variant="outlined" className={classes.paper}>
					<Typography>12345678</Typography>
					<Typography>Elizabeth Keen</Typography>
					<Typography>x-ray</Typography>
					<Typography>B9</Typography>
					<Typography>Confirmed</Typography>
				</Paper>
			</div>
		</div>
	);
}
