import ErrorBoundary from "components/ErrorBoundary";
import ScrollToTop from "components/ScrollToTop";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
// Add your imports here
import SignIn from "pages/auth/signin";
import SignUp from "pages/auth/signup";
import CollectionsPage from "pages/collections";
import DealsPage from "pages/deals";
import LandingPage from "pages/landing-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
