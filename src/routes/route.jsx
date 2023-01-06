import { Navigate } from "react-router-dom";
import Money from "../pages/money/Money";
import Account from "../pages/Account/Account";
import IndexPage from "../pages/IndexPage/IndexPage";

const routers = [
  // redirect
  {
    path: "",
    element: <IndexPage />,
  },
  {
    path: "/index",
    element: <IndexPage />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

export default routers;
