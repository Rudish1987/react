import { createStore, persist} from 'easy-peasy';
import hotelModel from './models/search'

const store = createStore(persist(hotelModel));

export default store;
