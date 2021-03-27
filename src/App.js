// import logo from './logo.svg';
import { createMuiTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import ManageAppointments from "./pages/ManageAppointments";
import Settings from "./pages/Settings";

const theme = createMuiTheme({});

function App() {
	const isLoggedIn = localStorage.getItem("auth_token") != null;
	// const isLoggedIn = true;
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
					<Layout>
						<Route exact path="/">
							<Appointments />
						</Route>
						<Route path="/manage-appointments">
							<ManageAppointments />
						</Route>
						{/* <Route path={["/", "/manage-appointments", "/settings"]} exact>
							{isLoggedIn ? <Appointments /> : <Redirect to="/login" />}
						</Route> */}
						<Route path="/settings">
							<Settings />
						</Route>
						<Route path="/">
							<Redirect to={isLoggedIn ? "/" : "/login"} />
						</Route>
					</Layout>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
