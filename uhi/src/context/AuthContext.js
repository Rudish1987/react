import React, { useEffect, createContext, useContext } from 'react'
import { useStore } from 'easy-peasy';
import { useCheckLoggedInUser } from './btob/authHooks'
import LandingSkeleton from '../components/skeleton/LandingSkeleton';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
	const store = useStore();
	const [isLoading, setIsLoading] = React.useState(false);
	const user = store.getState().user;
	const getUser = store.getActions().getUser;

	const { CheckLoggedInUser } = useCheckLoggedInUser()

	useEffect(() => {
		const checkAuthUser = async () => {
			await getUser(CheckLoggedInUser())
			setIsLoading(true)
		}
		checkAuthUser()
	}, [])

	return isLoading ? (
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	) : (<LandingSkeleton></LandingSkeleton>);
}

export default AuthProvider;