import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useAppRouter } from "./app/router";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Suspense } from "react";




function App() {
  const router = useAppRouter();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
         <RouterProvider router={router} />
      </Suspense>
     </ErrorBoundary>
  );
}

export default App;
