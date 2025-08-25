import type { IUser } from '../types/IUser';
import type { UserData } from '../types/IUser';
import fetchWithAuth from './fetchWithAuth';

export const getUser = (id: string): Promise<IUser> => {
	console.log(id);
	// return mockGetUser();
	return fetchWithAuth(`/user/${id}`);
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

export const updateUser = (data: FormData): Promise<IUser> => {
	// return mockUpdateUser(data);
	return fetchWithAuth('/user', {
		method: 'PUT',
		body: data,
	});
};

