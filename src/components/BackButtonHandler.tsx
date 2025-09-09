import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBackButtonStore } from "../store/BackButtonStore";

const ignorePaths = [
  "/",
  '/register'
];

export const BackButtonHandler = () => {
  const location = useLocation();
  const actions = useBackButtonStore((state) => state.actions);
  const popAction = useBackButtonStore((state) => state.popAction);

  useEffect(() => {
    const telegramBackButton = window.Telegram?.WebApp?.BackButton;
    if (!telegramBackButton) return;

    if (ignorePaths.includes(location.pathname)) {
      telegramBackButton.hide();
      return;
    }

    const handleBackPress = () => {
      if (actions.length > 0) {
        const lastAction = actions[actions.length - 1];
        lastAction();
        popAction();
      }
    };

    if (actions.length > 0) {
      telegramBackButton.onClick(handleBackPress);
      telegramBackButton.show();
    } else {
      telegramBackButton.offClick(handleBackPress);
      // telegramBackButton.hide();
    }

    return () => {
      telegramBackButton.offClick(handleBackPress);
    };
  }, [location.pathname, actions]);

  return null;
};
