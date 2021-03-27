import { makeStyles, TextField, InputAdornment, IconButton, Icon, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	textField: {
		width: "40%",
		position: "relative",
		left: "20em",
	},
	button: {
		width: "4em",
		position: "relative",
		left: "20em",
	},
});

export default function Login() {
	const classes = useStyles();
	const [userDetails, setUserDetails] = useState({
		staffID: "",
		passowrd: "",
	});
	const [inputSettings, setInputSettings] = useState({
		staffIDError: false,
		staffIDErrorMsgs: "",
		passowrdError: false,
		passowrdErrorMsgs: "",
		showPassword: false,
	});

	const handleLogin = (e) => {
		e.preventDefault();
		setInputSettings({ ...inputSettings, staffIDError: false, passowrdError: false });
		if (userDetails.staffID === "") {
			setInputSettings({
				...inputSettings,
				staffIDError: true,
				staffIDErrorMsgs: "Staff ID is required",
			});
		} else if (userDetails.passowrd === "") {
			setInputSettings({
				...inputSettings,
				passowrdError: true,
				passowrdErrorMsgs: "Password is required",
			});
		}
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
					backgroundColor: "beige",
					justifyContent: "space-between",
				}}>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "10em",
						backgroundColor: "beige",
						justifyContent: "space-between",
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
							setInputSettings({ ...inputSettings, passowrdError: false });
							setUserDetails({ ...userDetails, passowrd: e.target.value });
						}}
						value={userDetails.passowrd}
						margin="normal"
						required
						fullWidth
						name="password"
						type={inputSettings.showPassword ? "text" : "password"}
						id="password"
						autoComplete="current-password"
						error={inputSettings.passowrdError}
						helperText={inputSettings.passowrdError ? inputSettings.passowrdErrorMsgs : null}
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
						variant="contained"
						color="primary">
						Login
					</Button>
				</form>
			</div>
		</div>
	);
}
