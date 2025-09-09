import type { IUser } from "../types/IUser";
import fetchWithAuth from "./fetchWithAuth";

export const getCurrentUser = (): Promise<IUser> => {
	return fetchWithAuth('/user/me');
};
