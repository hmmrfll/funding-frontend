import { create } from 'zustand';

type ModalStore = {
	modal: 'qr' | null;
	openModal: (modal: 'qr') => void;
	closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
	modal: null,
	openModal: (modal: 'qr') => set(() => ({ modal })),
	closeModal: () => set(() => ({ modal: null })),
}));
