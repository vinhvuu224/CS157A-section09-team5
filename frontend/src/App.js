import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';
import './App.css';
import { UserContext } from './UserContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import RedirectOnceLoggedIn from './components/routes/RedirectOnceLoggedIn';
import Home from './components/pages/Home';

const App = () => {
	const [user, setUser] = useState(null);

	const User = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
		<Router>
			<UserContext.Provider value={User}>
				<div className = 'container'>
					<Switch>
						<RedirectOnceLoggedIn exact path='/' component={Landing} />
						<AuthenticatedRoute exact path='/Home' component={Home} />
						<RedirectOnceLoggedIn exact path='/register' component={Register} />
						<RedirectOnceLoggedIn exact path='/login' component={Login} />
					</Switch>
				</div>			
			</UserContext.Provider>
		</Router>
  );
}

export default App;
