import React from 'react';
import { Navigate, } from 'react-router-dom'
import { useStore } from 'easy-peasy';

export default function ProtectedRoute({ children }) {
	const store = useStore();
	const isAuth = store.getState().isAuth;
	const user = store.getState().user;

	return (Object.keys(user).length > 0 && isAuth) ? children : <Navigate to='/' />;
}