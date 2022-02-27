import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './Store';

// Use throughout your app instead of plain `useDispatch` and `useSelector` So you don't need to import and use types in your screens all the times
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
