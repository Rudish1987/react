const API_BASE = ((process.env.NODE_ENV == 'development') ? process.env.REACT_APP_API_BASE_DEV : process.env.REACT_APP_API_BASE) + 'api/';
const B2B = 'b2b/';

export const HOTELS = {
	get_filter_list: API_BASE + 'accommodation/filters',
	get_search_result: API_BASE + 'accommodation/search',
	save_room: API_BASE + 'accommodation/savebooking',
};

export const USER = {
	registration: API_BASE + 'auth/register',
	validateOtp: API_BASE + 'auth/validateotp',
	loguser: API_BASE + 'auth/loguser',
	resendOtp: API_BASE + 'auth/resendotp',
	login: API_BASE + 'auth/login',
	logout: API_BASE + 'auth/logout',
	profile: API_BASE + 'profile',
	changePassword: API_BASE + 'profile/change-password',
	forgotPassword: API_BASE + 'auth/forgot-password',
	resetPassword: API_BASE + 'auth/reset-password',
	loggedInUser: API_BASE + 'auth/user',
};
export const LANDING = {
	get_news_list: API_BASE + 'news',
	get_blog_posts_list: API_BASE + 'blog/posts',
	get_country_list: API_BASE + 'countries',
	get_city_list: API_BASE + 'cities',
	get_salutation_list: API_BASE + 'salutations',
};
export const TRANSFERS = {
	get_maqam_route: API_BASE + 'transfer/getroute',
	get_search_result: API_BASE + 'transfer/search',
	get_maqam_supplier: API_BASE + 'transfer/supplier',
	save_transfer: API_BASE + 'transfer/savebooking',
	get_category_list: API_BASE + 'transfer/vehicle-category',
	get_vehicle_type_list: API_BASE + 'transfer/vehicle-type',
};

export const STATIC_PAGES = {
	get_about_us: API_BASE + 'about-us',
	get_contact_us: API_BASE + 'contact-us',
	get_our_story: API_BASE + 'our-story',
};

export const GROUND_SERVICES = {
	get_search_result: API_BASE + 'groundservices/search',
	get_category_list: API_BASE + 'groundservices/gs-category',
	save_ground_service: API_BASE + 'groundservices/save',
	get_ground_service: API_BASE + 'groundservices/get-tour'
};
export const BOOKING = {
	update_booking_customer: API_BASE + 'booking/updateCustomer',
	amend_passenger: API_BASE + 'booking/amend-passenger',
	amend_flight: API_BASE + 'booking/amend-passenger-flight',
	get_passengers_flight: API_BASE + 'booking/passengers-flight',
	get_details_after_booking: API_BASE + 'booking',
	delete_itenerary: API_BASE + 'booking/cancel-itinerary',
	payment_auth_token: API_BASE + 'booking/authtoken',
	payment_auth_3ds: API_BASE + 'booking/authorize3ds',
	confirm_booking: API_BASE + 'booking/confirm-itinerary-booking',
	visa_request: API_BASE + 'booking/process-visa-request',
	confirm_credit_booking: API_BASE + 'booking/confirm-itinerary-credit-booking',
	booking_list: API_BASE + 'booking/list',
	cancel_itinerary: API_BASE + 'booking/cancel-itinerary-booking',
	currency_rate: API_BASE + 'booking/get-currency-conversion-rate',
	city_airport_list: API_BASE + 'getairportdetail',
	visa_request_id: API_BASE + 'booking/get-visa-request-id',
	send_uo_mail: API_BASE + 'booking/send-uo-mail',
	check_mutamer_info: API_BASE + 'booking/checkMutamerInfo',
};

export const VISA = {
	post_visa_save_booking: API_BASE + 'visa/save-booking',
	get_visa_fees: API_BASE + 'maqam-visa/calculate-fees',
	get_mutamer_validation: API_BASE + 'maqam-visa/mutamer-validation',

	//new VISA routes
	//visa_package_list: API_BASE + 'visa/package-list',
	get_travelers_list: API_BASE + B2B + 'umrah-visa/traveler-list/',
	get_booking_list: API_BASE + B2B +'umrah-visa/package-list',
	remove_traveler	  : API_BASE + 'visa/remove-traveler',
	send_visa	  : API_BASE + 'visa/send-visa',
};
export const B2B_STATIC_PAGES = {
	B2B_aboutUs_innerPage: B2B + 'about-us',
	B2B_contactUs_innerPage: B2B + 'contact-us',
	get_testimonial_list: B2B + 'testimonial',
	get_termOfUse_termAndCondition: B2B + 'term-of-use',
};
export const B2BUSER = {
	get_blog_post: 'blog/posts',
	B2Blogin: B2B + 'auth/login',
	join_us: 'auth/register',
	get_user_information: B2B + 'auth/user',
	B2BResetPassword : 'auth/reset-password',
	B2BforgotPassword: 'auth/forgot-password',
	B2B_customer_type: B2B + 'usertype',
}

export const B2B_VISA = {
	get_list_request: B2B + 'umrah-visa/list-visa-package',
	scan_passport_post: B2B + 'umrah-visa/klippa/identity',
	add_visa_passenger_post: B2B + 'umrah-visa/save-booking',
	invaild_visa_passenger_post: B2B + 'umrah-visa/confirm-invalid-passenger',
	get_safa_country_list: B2B + 'umrah-visa/safa-country',
	get_edit_passengers: B2B + 'umrah-visa/passengers',
	get_internal_reference: B2B +'umrah-visa/save-reference',
	get_safa_salutation: B2B +'umrah-visa/salutations',
	remove_traveler_from_list: B2B +'umrah-visa/cancel-booking',
}

export const B2B_PAYMENT = {
	payment_auth_token: B2B + 'booking/authtoken',
	payment_auth_3ds: B2B + 'booking/authorize3ds',
	confirm_booking: B2B + 'umrah-visa/confirm-booking',
}

/************
  WhiteLabel 
 ************/
export const WHITELABEL = {
	get_Look_and_Feel: B2B + 'look-and-feel',
}