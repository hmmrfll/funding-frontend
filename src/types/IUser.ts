export interface IUser {
    id: string;
    telegramId: string;
    name: string;
    avatarUrl?: string;
    hasExtendedKeys: boolean;
    hasHyperliquidKeys: boolean;
    createdAt: string;
    updatedAt: string;
}

export type UserUpdateData = {
    name?: string;
    avatarUrl?: string;
    extendedApiKey?: string;
    extendedApiSecret?: string;
    hyperliquidApiKey?: string;
    hyperliquidApiSecret?: string;
};

export type UserRole = 'user' | 'admin';

export type UserData = Omit<IUser, 'id' | 'bonusCount' | 'role' | 'userCode' | 'company'>;
