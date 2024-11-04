import React from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import { AuthPage } from "./pages";
import MainLayout from "./components/layout/main-layout/main-layout";
import AuthGuard from "./contexts/auth/guards/auth-guard";
import NonAuthGuard from "./contexts/auth/guards/not-auth-guard";
import AuthAdminGuard from "./contexts/auth/guards/auth-admin-guard";
import CategoryPage from "./admin/pages/category-page";
import ProductsPage from "./admin/pages/products-page";
import ColorPage from "./admin/pages/color-page";
import AdminLayout from "./components/layout/admin-layout/admin-layout";
import "src/fonts/stylesheet.css";
import { AnimatePresence } from "framer-motion";
import OffersPage from "./admin/pages/offers-page";
import { MainPage, ProductPage } from "src/pages";
import { CheckoutPage } from "./pages/checkout/checkout-page";
import { AccountPage } from "./pages/account/account-page";
import { SIGN_IN_PATH } from "./routes/routes-config";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.key}>
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/checkout"} element={<CheckoutPage />} />
          <Route path={"/account"} element={<AccountPage />} />
          <Route path={"product/:idProduct"} element={<ProductPage />} />
        </Route>
        <Route
          path={"auth"}
          element={
            <NonAuthGuard defaultAuthorizedPath="/">
              <MainLayout>
                <Outlet />
              </MainLayout>
            </NonAuthGuard>
          }
        >
          <Route path={"signIn"} element={<AuthPage />}></Route>
          <Route path={"signUp"} element={<AuthPage />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <AuthGuard signInPath={SIGN_IN_PATH}>
              <Outlet />
            </AuthGuard>
          }
        >
          <Route path="*" element={<div>404</div>}></Route>
        </Route>
        <Route
          element={
            <AuthGuard signInPath={SIGN_IN_PATH}>
              <AuthAdminGuard signInPath={"/"}>
                <Outlet />
              </AuthAdminGuard>
            </AuthGuard>
          }
        >
          <Route
            path={"admin"}
            element={
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            }
          >
            <Route index element={<div></div>}></Route>
            <Route path={"category"} element={<CategoryPage />}></Route>
            <Route path={"product"} element={<ProductsPage />}></Route>
            <Route path={"color"} element={<ColorPage />}></Route>
            <Route path={"offers"} element={<OffersPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
