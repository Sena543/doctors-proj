import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import ManageAppointments from "./pages/ManageAppointments";
import Settings from "./pages/Settings";
import { ApolloClient, ApolloProvider, concat, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";
import GlobalIDContext from "./context/UserID";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({ uri: "http://localhost:9000/" });
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = sessionStorage.getItem("auth_token");
	if (token) {
		const { exp } = jwtDecode(token);
		const expirationTime = exp * 1000 - 60 * 60;
		// console.log({ expirationTime, exp });
		if (Date.now() >= expirationTime) {
			sessionStorage.clear();
			// history.push("/login");
			window.location = "/login";
		}
	}
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : "",
		},
	};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const securedLink = authLink.concat(httpLink);
const client = new ApolloClient({
	link: concat(errorLink, securedLink),
	// link: authLink.concat(httpLink),
	// uri: "http://localhost:9000/",
	cache: new InMemoryCache(),
});

function App() {
	const isLoggedIn = sessionStorage.getItem("auth_token") != null;
	const { user } = sessionStorage.getItem("auth_token")
		? jwtDecode(sessionStorage.getItem("auth_token"))
		: "";

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<GlobalIDContext.Provider value={{ user }}>
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
								<Route path="/settings">
									<Settings />
								</Route>
								<Route path="/">
									<Redirect to={isLoggedIn ? "/" : "/login"} />
								</Route>
							</Layout>
						</Switch>
					</Router>
				</GlobalIDContext.Provider>
			</ApolloProvider>
		</div>
	);
}

export default App;
