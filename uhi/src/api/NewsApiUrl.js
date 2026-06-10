import UseHttp from './UseHttp';
import {LANDING} from './Url';

export const newsList = () => UseHttp({ url: LANDING.get_news_list });
export const postsList = () => UseHttp({ url: LANDING.get_blog_posts_list });