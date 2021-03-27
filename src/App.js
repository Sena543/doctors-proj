// import logo from './logo.svg';
import { createMuiTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointments from "./pages/Appointments";
import ManageAppointments from "./pages/ManageAppointments";
import Settings from "./pages/Settings";


const theme = createMuiTheme({
	
})

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Layout>
						<Route exact path="/">
							<Appointments />
						</Route>
						<Route path="/manage-appointments">
							<ManageAppointments />
						</Route>
						<Route path="/settings">
							<Settings />
						</Route>
					</Layout>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
