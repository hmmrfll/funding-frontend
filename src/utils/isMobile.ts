export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const fullScreenPaddingTop = !isMobile ? `pt-0` : isIos ? `pt-[92px]` : `pt-[75px]`;
export const fullScreenPaddingBottom = `pb-[50px]`;
