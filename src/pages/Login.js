import { makeStyles, TextField, InputAdornment, IconButton, Icon, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce } from "react-activity";

const LOGIN_USER = gql`
	mutation($studentID: ID!, $password: String!) {
		loginUser(studentID: $studentID, password: $password) {
			token
		}
	}
`;

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		// backgroundColor: "#fff",
		alignItems: "center",
	},
	textField: {
		width: "30em",
		// position: "relative",
		// left: "20em",
	},
	button: {
		width: "5em",
		position: "relative",
		left: "40%",
		top: "2em",
	},
});

export default function Login() {
	const classes = useStyles();
	const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER, {
		onCompleted: (response) => {
			// console.log(response?.loginUser?.token);
			sessionStorage.setItem("auth_token", response?.loginUser?.token);
			window.location = "/";
		},
	});
	const [userDetails, setUserDetails] = useState({
		staffID: "",
		password: "",
	});
	const [inputSettings, setInputSettings] = useState({
		staffIDError: false,
		staffIDErrorMsgs: "",
		passwordError: false,
		passwordErrorMsgs: "",
		showPassword: false,
	});
	document.title = "Login";

	const handleLogin = (e) => {
		e.preventDefault();
		setInputSettings({ ...inputSettings, staffIDError: false, passwordError: false });
		if (userDetails.staffID === "") {
			setInputSettings({
				...inputSettings,
				staffIDError: true,
				staffIDErrorMsgs: "Staff ID is required",
			});
			return;
		} else if (userDetails.passowrd === "") {
			setInputSettings({
				...inputSettings,
				passwordError: true,
				passwordErrorMsgs: "Password is required",
			});
			return;
		}
		loginUser({ variables: { studentID: userDetails.staffID, password: userDetails.password } });
	};

	return (
		<div className={classes.root}>
			<div style={{ display: "flex" }}>
				<img src={`${process.env.PUBLIC_URL}/medicalLogo.png`} width="500%" height="50%" alt="logo" />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "20em",
					// backgroundColor: "beige",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
					}}
					onSubmit={handleLogin}
					noValidate>
					<TextField
						className={classes.textField}
						label="Staff Identification Number"
						value={userDetails.staffID}
						onChange={(e) => {
							setInputSettings({ ...inputSettings, staffIDError: false });
							setUserDetails({ ...userDetails, staffID: e.target.value });
						}}
						margin="normal"
						required
						fullWidth
						id="staffID"
						name="staffID"
						autoComplete="staffID"
						autoFocus
						error={inputSettings.staffIDError}
						helperText={inputSettings.staffIDError ? inputSettings.staffIDErrorMsgs : null}
					/>
					<TextField
						className={classes.textField}
						label="Password"
						onChange={(e) => {
							setInputSettings({ ...inputSettings, passwordError: false });
							setUserDetails({ ...userDetails, password: e.target.value });
						}}
						value={userDetails.passowrd}
						margin="normal"
						required
						fullWidth
						name="password"
						type={inputSettings.showPassword ? "text" : "password"}
						id="password"
						autoComplete="current-password"
						error={inputSettings.passwordError}
						helperText={inputSettings.passwordError ? inputSettings.passwordErrorMsgs : null}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle Password Visibility"
										onClick={() =>
											setInputSettings({
												...inputSettings,
												showPassword: !inputSettings.showPassword,
											})
										}>
										<Icon>
											{inputSettings.showPassword ? <Visibility /> : <VisibilityOff />}
										</Icon>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						className={classes.button}
						type="submit"
						fullWidth
						disableFocusRipple
						variant="contained"
						color="primary">
						{loginLoading ? <Bounce color="#fff" /> : "Login"}
					</Button>
				</form>
				<div style={{ position: "relative", top: "20%", right: "1%" }}>
					<Link to="signup">Sign up</Link>
				</div>
			</div>
		</div>
	);
}
