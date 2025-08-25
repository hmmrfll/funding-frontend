export interface IPartnerStock {
	id: number;
	partnerName: string;
	partnerKey: PartnerKey;
	description: string;
	count: number;
}

export interface IUserBonus {
	id: number;
	partnerName: string;
	partnerKey: PartnerKey;
	bonusName: string;
	amount: number;
	actionType: ActionType;
	date: string;
}

export interface IPartnerOffer {
	id: number;
	imageUrl: string;
	title: string;
	startDate: string;
	endDate: string;
	isActive: boolean;
	type: 'one-time' | 'recurring';
}

export interface IContactItem {
	id: number;
	type: string;
	value: string;
	label?: string;
	icon?: string;
	link?: string;
}

export interface IPartnerInfoData {
	id: number;
	partnerName: string;
	partnerKey: PartnerKey;
	description: string;
	count: number;
	offers: IPartnerOffer[];
	details: string;
	website: string;
	contacts: IContactItem[];
}

export interface ITransaction {
	id: number;
	userName: string;
	adminName: string;
	actionType: ActionType;
	amount: number;
	date: string;
}

export type ActionType = 'addition' | 'withdrawal';

export type PartnerKey = 'Ydent' | 'GravityFit' | 'PreventPlus' | 'IvaSpa';

