import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EnduranceGuidePage from "./pages/endurance-guide/EnduranceGuidePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EnduranceGuidePage />
  </StrictMode>,
);
