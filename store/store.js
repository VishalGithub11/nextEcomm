import {configureStore} from '@reduxjs/toolkit';
import fetchQuantitySlice from '../slice/cartQuantity';

export default configureStore({
    reducer: {fetchQuantitySlice}
})