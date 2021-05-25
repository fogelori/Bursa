import Home from "../Home/Home";
import CompaniesData from "../CompaniesData/CompaniesData";
// import ImedReportsPage from "./ImedReports/ImedReportsPage";
// import StockPage from "./Stock/StockPage";

const menuList = [
  {
    name: "Home",
    component: Home,
    path: "/",
    link: "/",
    exact: true,
  },
  {
    name: "Companies Data",
    component: CompaniesData,
    path: "/companiesdata",
    link: "/",
    exact: false,
  },
  //   {
  //     name: "Imediate Reports",
  //     component: ImedReportsPage,
  //     path: "/imedreports",
  //     link: "/imedreports",
  //     exact: false,
  //   },
  //   {
  //     name: "Stock",
  //     component: StockPage,
  //     path: "/stockpage",
  //     link: "/stockpage",
  //     exact: false,
  //   },
];

export default menuList;
