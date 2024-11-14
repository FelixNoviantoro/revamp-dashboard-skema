import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './app.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const selectError = createSelector(selectAuthState, (state) => state.error);
