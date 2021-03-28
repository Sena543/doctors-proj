import { Button, makeStyles, TextField, Icon, InputAdornment, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
	},
	button: {
		width: "10em",
		margin: "1em",
	},
	textField: {
		width: "30em",
		// position: "relative",
		// left: "20em",
	},
	form: {
		flexDirection: "column",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		border: "1px dashed #DBE1E4",
		width: "30%",
		position: "relative",
		left: "35%",
	},
});

export default function Signup() {
	const classes = useStyles();
	const [signupDetails, setSignupDetails] = useState({
		doctorName: "",
		doctorID: "",
		email: "",
		password: "",
		officeNumber: "",
		confirmPassword: "",
		timesAvailable: [],
	});
	const [showPass, setShowPass] = useState(false);
	const handleTextChange = (name, value) => {
		setSignupDetails({ ...signupDetails, [name]: value });
	};
	return (
		<div className={classes.root}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<img src={`${process.env.PUBLIC_URL}/medicalLogo.png`} width="10%" height="10%" alt="logo" />
			</div>
			<form className={classes.form} noValidate>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Staff Identification Number"
					value={signupDetails.doctorID}
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					margin="normal"
					required
					fullWidth
					id="doctorID"
					name="doctorID"
					autoFocus
					error={!Boolean(signupDetails.doctorID)}
					helperText={!Boolean(signupDetails.doctorID) ? "This field is required" : null}
				/>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Full Name"
					value={signupDetails.doctorName}
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					margin="normal"
					required
					fullWidth
					id="doctorName"
					name="doctorName"
					error={!Boolean(signupDetails.doctorName)}
					helperText={!Boolean(signupDetails.doctorName) ? "This field is required" : null}
				/>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Email"
					value={signupDetails.email}
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					margin="normal"
					required
					fullWidth
					id="email"
					name="email"
					error={!Boolean(signupDetails.email)}
					helperText={!Boolean(signupDetails.email) ? "This field is required" : null}
				/>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Office Number"
					value={signupDetails.officeNumber}
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					margin="normal"
					required
					fullWidth
					id="officeNumber"
					name="officeNumber"
					error={!Boolean(signupDetails.officeNumber)}
					helperText={!Boolean(signupDetails.officeNumber) ? "This field is required" : null}
				/>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Password"
					value={signupDetails.password}
					margin="normal"
					required
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					fullWidth
					id="password"
					name="password"
					type={showPass ? "text" : "password"}
					error={!Boolean(signupDetails.password)}
					helperText={!Boolean(signupDetails.password) ? "This field is required" : null}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle Password Visibility"
									onClick={() => setShowPass(!showPass)}>
									<Icon>{showPass ? <Visibility /> : <VisibilityOff />}</Icon>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classes.textField}
					variant="outlined"
					label="Confirm Password"
					value={signupDetails.confirmPassword}
					type={showPass ? "text" : "password"}
					onChange={(e) => handleTextChange(e.target.name, e.target.value)}
					margin="normal"
					required
					fullWidth
					id="confirmPassword"
					name="confirmPassword"
					error={!Boolean(signupDetails.confirmPassword)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle Password Visibility"
									onClick={() => setShowPass(!showPass)}>
									<Icon>{showPass ? <Visibility /> : <VisibilityOff />}</Icon>
								</IconButton>
							</InputAdornment>
						),
					}}
					helperText={!Boolean(signupDetails.confirmPassword) ? "This field is required" : null}
				/>
				<Button
					className={classes.button}
					type="submit"
					fullWidth
					disableFocusRipple
					variant="contained"
					color="primary">
					Sign Up
				</Button>
			</form>
			<div style={{ position: "relative", top: "20%", right: "1%", margin: "4em" }}>
				<Link to="/login">Sign In</Link>
			</div>
		</div>
	);
}
