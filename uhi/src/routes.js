import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import BtobDashboardLayout from './layouts/btobDashboard';
import BtobGuestLayout from './layouts/btobGuest';
import BtobAuthLayout from './layouts/btobAuth';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';

import { default as MaqamLandingPage } from './pages/maqam-hotels/LandingPage';
import { default as MaqamHotelPage } from './pages/maqam-hotels/HotelPage';
import HotelsPage from './pages/HotelsPage';

import { default as MaqamTransferLandingPage } from './pages/maqam-transfer/LandingPage';

import { default as MaqamGroundServiceLandingPage } from './pages/maqam-groundservice/LandingPage'
import { default as ConfirmationPage } from './pages/confirmation/LandingPage'
import { default as PassengerDetails } from './pages/confirmation/PassengerDetails'
import { default as PaymentDetails } from './pages/confirmation/PaymentDetails'
import { default as PackageCancellation } from './pages/confirmation/PackageCancellation'
import { default as BookingConfirmation } from './pages/confirmation/BookingConfirmation'
import { default as BookingDetails } from './pages/confirmation/BookingDetails'
import { default as MyBooking } from './pages/users/MyBooking'
import { default as AgentCreditPage } from './pages/confirmation/AgentCreditPage'
import { default as MyProfile } from './pages/users/MyProfile'
import { default as ChangePassword } from './pages/users/ChangePassword'
import { default as ForgotPasswordPage } from './pages/users/ForgotPasswordPage'
import ResetPasswordPage from './pages/users/ResetPasswordPage';
import LandingPage from './pages/guests/LandingPage'; // B2C landing page
import Landing from './pages/btob/Landing';
import RequestDemo from './pages/btob/RequestDemo'
import JoinUs from './pages/btob/JoinUs'
import BtobAboutUs from './pages/btob/BtobAboutUs'
import BtobContactUs from './pages/btob/BtobContactUs'
import ForgotPassword from './pages/btob/ForgotPassword'
import ResetPassword from './pages/btob/ResetPassword'
import Visa from './pages/visa/Visa'
import Payment from './pages/visa/Payment'
import AddTraveller from './pages/visa/AddTraveler'
import TravelerListIndex from './pages/visa/TravelerListIndex'
import ProtectedRoute from './components/common/ProtectedRoute';
import SearchForm from './pages/btob/SearchForm'
import { useStoreState } from 'easy-peasy';

// ----------------------------------------------------------------------

export default function Router() {
	const isAuth = useStoreState(s => s.isAuth)
	return useRoutes([
		{
			path: '/app',
			element: <DashboardLayout />,
			children: [
				{ index: true, element: <DashboardApp /> },
				{
					path: 'hotels',
					children: [
						{ index: true, element: <MaqamLandingPage /> },
						{ path: ':hotelId/details', element: <MaqamHotelPage /> }
					]
				},
				{
					path: 'transfer',
					element: <MaqamTransferLandingPage />
				},
				{
					path: 'groundservice',
					element: <MaqamGroundServiceLandingPage />
				},
				{
					path: 'book-now',
					element: <HotelsPage />
				},
				{
					path: 'my-bookings',
				},
				{
					path: 'account',
				},
				{
					path: 'users',
				},
				{
					path: 'e-wallet',
				},
			]
		},
		{
			path: '/umrah-package',
			element: <ProtectedRoute><BtobAuthLayout/></ProtectedRoute>,
			children: [
				{ index: true, element: <LandingPage /> },
				{
					path: 'hotels',
					children: [
						{ path: ':destination/results', element: <MaqamLandingPage /> },
						{ path: ':hotelId/details', element: <MaqamHotelPage /> }
					]
				},
				{
					path: 'transfer',
					element: <MaqamTransferLandingPage />
				},
				{
					path: 'groundservice',
					element: <MaqamGroundServiceLandingPage />
				},
				{
					path: 'confirmation',
					children: [
						{ path: ':step', element: <ConfirmationPage /> },
					]
				},
				{
					path: 'reset-password',
					element: <ResetPasswordPage />
				},
				{
					path: 'forgot-password',
					element: <ForgotPasswordPage />
				},
				{
					path: 'rebook',
					children: [
						{ path: 'hotel/:destination/search', element: <MaqamLandingPage /> },
						{ path: 'transfer/search', element: <MaqamTransferLandingPage /> },
						{ path: 'groundservice/search', element: <MaqamGroundServiceLandingPage /> },
					]
				},
				{
					path: 'my-booking',
					element: <MyBooking />
				},
			]
		},
		{
			path: '/package',
			element: <BtobGuestLayout />,
			children: [
				{ index: true, element: <DashboardApp /> },
				{
					path: 'hotels',
					children: [
						{ path: ':destination/results', element: <MaqamLandingPage /> },
						{ path: ':hotelId/details', element: <MaqamHotelPage /> }
					]
				},
				{
					path: 'transfer',
					element: <MaqamTransferLandingPage />
				},
				{
					path: 'groundservice',
					element: <MaqamGroundServiceLandingPage />
				},
				{
					path: 'confirmation',
					children: [
						{ path: ':step', element: <ConfirmationPage /> },
					]
				},
				{
					path: 'reset-password',
					element: <ResetPasswordPage />
				},
				{
					path: 'forgot-password',
					element: <ForgotPasswordPage />
				},
				{
					path: 'rebook',
					children: [
						{ path: 'hotel/:destination/search', element: <MaqamLandingPage /> },
						{ path: 'transfer/search', element: <MaqamTransferLandingPage /> },
						{ path: 'groundservice/search', element: <MaqamGroundServiceLandingPage /> },
					]
				},
			]
		},
		{
			path: '/users',
			element: <ProtectedRoute><BtobAuthLayout /></ProtectedRoute>,
			children: [
				{ index: true, element: <DashboardApp /> },
				{
					path: 'my-booking',
					element: <MyBooking />
				},
				{
					path: 'passengers',
					element: <PassengerDetails />
				},
				{
					path: 'payment',
					element: <PaymentDetails />
				},
				{

					path: 'packageCancellation',
					element: <PackageCancellation />
				},
				{
					path: 'booking-confirmation',
					element: <BookingConfirmation />
				},
				{
					path: 'booking-details',
					element: <BookingDetails />
				},
				{
					path: 'profile',
					element: <MyProfile />

				},
				{
					path: 'agentCredit',
					element: <AgentCreditPage />
				},


				{
					path: 'change-password',
					element: <ChangePassword />
				},
				{
					path: 'forgot-password',
					element: <ForgotPasswordPage />
				},
			]
		},
		{
			path: '/',
			element: isAuth ? <ProtectedRoute><BtobAuthLayout/></ProtectedRoute> : <BtobDashboardLayout />,
			children: [
				{ path: '/', element: <Landing /> },
				{ path: '*', element: <Navigate to="/404" /> },
			]
		},
		{
			path: '/',
			element: isAuth ? <ProtectedRoute><BtobAuthLayout/></ProtectedRoute> : <BtobGuestLayout />,
			children: [
				{ path: 'request-demo', element: <RequestDemo /> },
				{ path: 'contact-us', element: <BtobContactUs /> },
				{ path: 'about-us', element: <BtobAboutUs /> },
				{ path: 'forgot-password', element: <ForgotPassword /> },
				{ path: 'reset-password', element: <ResetPassword /> },
				{ path: 'set-password', element: <ResetPassword /> },
				{ path: '404', element: <NotFound /> },
				{ path: 'search', element: <SearchForm /> },
				{ path: 'join-us', element: <JoinUs /> },
				{ path: 'join-us/:headOfficeId', element: <JoinUs /> },

			]
		},
		{
			path: '/visa',
			element: <ProtectedRoute><BtobAuthLayout/></ProtectedRoute>,
			children: [
				{ index: true, element: <Visa /> },
				{
					path: 'traveler-list/:itineraryId',
					element: <TravelerListIndex />,
				},
				{
					path: 'traveler-list',
					element: <TravelerListIndex />,
				},
				{
					path: 'add-traveller',
					element: <AddTraveller />,
				},
				{
					path: 'edit-traveller/:passengerId',
					element: <AddTraveller />,
				},
				{
					path: 'payment',
					element: <Payment />,
				}
			]
		}
	]);
}
