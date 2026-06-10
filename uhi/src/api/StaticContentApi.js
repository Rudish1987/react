import UseHttp from './UseHttp';
import {STATIC_PAGES} from './Url';

export const aboutUs = () => UseHttp({ url: STATIC_PAGES.get_about_us });

export const contactUs = () => UseHttp({ url: STATIC_PAGES.get_contact_us });

export const ourStory = () => UseHttp({ url: STATIC_PAGES.get_our_story });