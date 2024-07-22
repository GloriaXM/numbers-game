import { Suspense, StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppLoader } from "./suspense/AppLoader";
import ErrorBoundary from "./suspense/ErrorBoundary";
import { ErrorPage } from "./suspense/ErrorPage";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<AppLoader />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
