import { useBackButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const BackButton = () => {
  const backButton = useBackButton();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    backButton.show();

    const handler = () => {
      backButton.off("click", handler);
      navigate(-1);
      backButton.hide();
    };

    backButton.on("click", handler);

    return () => {
      backButton.off("click", handler);
      backButton.hide();
    };
  }, [location]);

  return null;
};
