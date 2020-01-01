import React from "react"
import {Switch, Route} from 'react-router-dom';
const {Suspense, lazy} = React;
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@components/Home'));
const Login = lazy(() => import(/* webpackChunkName: "index" */ '@pages/Login'));

const routes= [
	{
		path: "/",
		exact: true,
		component: Login
	},
	{
		path: "/home",
		exact: true,
		component: Home
	}
];

const Routes = () => (
	<Suspense fallback={<i>loading...</i>}>
		<Switch>
			{
				routes.map((r,index) => {
					const {path, exact, component} = r;
					const LazyCom = component;
					return (
						<Route
						    key={index}
						    exact={exact}
						    path={path}
						    render={() => <LazyCom/>}
				    />
					)
				})
			}
		</Switch>
	</Suspense>
);

export default Routes
