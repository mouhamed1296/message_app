/**
 * @fileoverview store pour stocker les valeurs de l'application
 */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

/**
 * Création et configuration du store
 */
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export default store;
