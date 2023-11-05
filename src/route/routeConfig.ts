import { createBrowserRouter } from "react-router-dom";
import { Invoice } from "../components/pages/invoice/Invoice";
import ShopPage from "../components/pages/shop/ShopPage";
import { LoginPage } from "../components/pages/login/Login";
import withAuth from "../components/hocs/withAuth";
import CustomerInvoice from "../components/pages/invoice/CustomerInvoice";
import ProductList from "../components/pages/product/ProductList";
import CustomersList from "../components/pages/user/CustomersList";
import InvoiceList from "../components/pages/invoice/InvoiceList";
import ParentComponent from "../components/test/ParentComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/shop",
    Component: withAuth(ShopPage),
  },
  {
    path: "/checkout",
    Component: withAuth(Invoice),
  },
  {
    path: "/customer/invoice",
    Component: withAuth(CustomerInvoice),
  },
  {
    path: "/products",
    Component: withAuth(ProductList),
  },
  {
    path: "/customers",
    Component: withAuth(CustomersList),
  },
  {
    path: "/invoices",
    Component: withAuth(InvoiceList),
  },

  {
    path: "/callback",
    Component: ParentComponent,
  },
]);
