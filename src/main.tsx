import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.tsx";
import ReduxProviderWrapper from "./redux/readux-provider/reduxProviderWrapper.tsx";
import { DashboardToaster } from "./components/ui/Toaster.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import ContextProvider from "./contexts/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProviderWrapper>
      <CartProvider>
        <ContextProvider>
          <RouterProvider router={routes} />
          <DashboardToaster />
        </ContextProvider>
      </CartProvider>
    </ReduxProviderWrapper>
  </StrictMode>,
);
