import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { BorderColorRounded, ListRounded, SettingsRounded } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";

const drawerWidth = 200;
const useStyles = makeStyles({
	root: {
		backgroundColor: "#F1F3F6",
	},
	drawer: {
		width: drawerWidth,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	active: {
		background: "#f4f4f4",
	},
});
export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const menuItems = [
		{
			text: "Appointment List",
			path: "/",
			icon: <ListRounded color="primary" />,
		},
		{
			text: "Manage Appointments",
			path: "/manage-appointments",
			icon: <BorderColorRounded color="primary" />,
		},
		{
			text: "Settings",
			path: "/settings",
			icon: <SettingsRounded color="primary" />,
		},
	];
	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{ paper: classes.drawerPaper }}
				anchor="left">
				{/* <img/> */}
				<img
					src={`${process.env.PUBLIC_URL}/medicalLogo.png`}
					width="100%"
					height="10%"
					alt="warining"
				/>
				{/* link list */}
				<List>
					{menuItems.map(({ text, path, icon }) => (
						<ListItem
							button
							key={text}
							onClick={() => history.push(path)}
							className={location.pathname === path ? classes.active : null}>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText>{text}</ListItemText>
						</ListItem>
					))}
				</List>
			</Drawer>
			<div style={{ width: "100%" }}>{children}</div>
		</div>
	);
}
