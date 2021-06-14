import Home from "../Home/Home";
import CompaniesData from "../CompaniesData/CompaniesData";
import { useTranslation } from "react-i18next";
// import ImedReportsPage from "./ImedReports/ImedReportsPage";
// import StockPage from "./Stock/StockPage";

export const useGetMenuList = () => {
  const { t, i18n } = useTranslation();
  const translationObj = t("navBar", {
    returnObjects: true,
  });

  const menuList = [
    {
      name: translationObj.home.title,
      component: Home,
      path: "/",
      link: "/",
      exact: true,
    },
    {
      name: translationObj.companiesData.title,
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
  return menuList;
};

// export default menuList;
