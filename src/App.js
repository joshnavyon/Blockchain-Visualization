import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import Error505 from "./pages/Error505";
import Error404 from "./pages/Error404";
import VisualGraph from "./pages/VisualGraph";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/wallet/:addressId":
  //       title = "Wallet Details";
  //       metaDescription = "";
  //       break;
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wallet/:addressId" element={<VisualGraph />} />
      <Route path="/error505" element={<Error505 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
export default App;
