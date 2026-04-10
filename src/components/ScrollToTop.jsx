import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // On remonte tout en haut de la fenêtre à chaque changement de chemin
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;