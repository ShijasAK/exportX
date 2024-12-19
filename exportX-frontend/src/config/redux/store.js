import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import userReducer from './slices/userSlice'
import settingReducer from './slices/settingSlice'
import historyReducer from './slices/historySlice'
// import Config from '../../../config';

const rootReducer = combineReducers({
  user: userReducer,
  setting: settingReducer,
  history: historyReducer
})

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      //   secretKey: Config.env().PERSIST_SECRET_KEY,
      secretKey: "secret",
      onError: (error) => console.warn(error),
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)