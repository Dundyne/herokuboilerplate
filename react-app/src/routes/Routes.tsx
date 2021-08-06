import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutUsPage from "../pages/about/AboutUsPage";
import AddApartmentPage from "../pages/addApartment/AddApartmentPage";
import ApartmentPage from "../pages/availableApartments/ApartmentPage";
import ContactUsPage from "../pages/contact/ContactUsPage";
import PdfPage from "../pages/pdf/PdfPage";
import SignInPage from "../pages/signin/SignInPage";
import SignUpPage from "../pages/signup/SignUpPage";
import ApartmentViewPage from "../pages/apartmentView/ApartmentViewPage";
import RegisterPage from "../pages/register/RegisterPage";
import EditApartmentPage from "../pages/editApartment/EditApartmentPage";
import HomeNewPage from "../pages/homenew/HomeNewPage";
import { useAuthContext } from "../context/AuthProvider";
import ResetPage from "../pages/resetpass/ResetPage";
import NewPPage from "../pages/newPass/NewPPage";
import ContactNewPage from "../pages/ContactNew/ContactNewPage";

const AdminRoutes = ({ children, ...rest }: any) => {
  const { isLoggedIn, isAdmin, isLoading } = useAuthContext() as any;

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn && isAdmin && !isLoading ? (
          children
        ) : (
          <Redirect to={{ pathname: "/loginuser" }} />
        )
      }
    />
  );
};

const Routes = () => (
  <Router>
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <HomeNewPage />
        </Route>
        <Route exact path="/welcome">
          <ApartmentPage />
        </Route>
        <Route exact path="/apartmentview/:id">
          <ApartmentViewPage />
        </Route>

        <Route exact path="/contact/">
          <ContactUsPage />
        </Route>

        <Route exact path="/contactus">
          <ContactUsPage />
        </Route>

        <Route exact path="/contact/:city/:address">
          <ContactNewPage />
        </Route>

        <Route exact path="/login/signin">
          <SignInPage />
        </Route>

        <Route exact path="/forgot">
          <ResetPage />
        </Route>

        <Route exact path="/reset/:id">
          <NewPPage />
        </Route>

        <AdminRoutes exact path="/login/signup">
          <SignUpPage />
        </AdminRoutes>
        <AdminRoutes exact path="/addApartment">
          <AddApartmentPage />
        </AdminRoutes>
        <AdminRoutes exact path="/editApartment/:id">
          <EditApartmentPage />
        </AdminRoutes>
        <Route exact path="/aboutus">
          <AboutUsPage />
        </Route>

        <AdminRoutes exact path="/pdf">
          <PdfPage />
        </AdminRoutes>

        <AdminRoutes exact path="/createuser">
          <RegisterPage />
        </AdminRoutes>

        <Route exact path="/loginuser">
          <SignInPage />
        </Route>
      </Switch>
    </MainLayout>
  </Router>
);

export default Routes;
