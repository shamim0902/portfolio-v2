import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Home from "./pages/Home";

// Lazy load resume page for better performance
const Resume = lazy(() => import("./pages/Resume"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/resume",
    Component: Resume,
  },
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">Page not found</p>
          <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Go home
          </a>
        </div>
      </div>
    ),
  },
]);
