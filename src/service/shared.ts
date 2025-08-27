import type { IUser, UserUpdateData } from '../types/IUser';
import type { UserData } from '../types/IUser';
import fetchWithAuth from './fetchWithAuth';

export const getCurrentUser = (): Promise<IUser> => {
	return fetchWithAuth('/user/me');
};

export const getUserByCode = (userCode: string): Promise<IUser> => {
	console.log(userCode);
	// return mockGetUser();
	return fetchWithAuth(`/user-by-code/${userCode}`);
};

export const createUser = (data: UserData): Promise<IUser> => {
	// return mockCreateUser(data);
	console.log(data);
	return fetchWithAuth('/user', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateUser = (data: UserUpdateData): Promise<IUser> => {
	return fetchWithAuth('/user', {
		method: 'PUT',
		body: JSON.stringify(data),
	});
};
