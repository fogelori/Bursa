import { useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { heIL, enUS } from "@material-ui/core/locale";

function useCustomTheme() {
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState({
    direction: "ltr",
    shortName: enUS,
  });
  // let localproperty;

  useEffect(() => {
    if (i18next.language == "he-IL") {
      setLocal((prevState) => ({
        ...prevState,
        direction: "rtl",
        shortName: heIL,
      }));
    } else {
      setLocal((prevState) => ({
        ...prevState,
        direction: "ltr",
        shortName: enUS,
      }));
    }
  }, [t]);

  const theme = createMuiTheme(
    {
      direction: local.direction, // Both here and <body dir="rtl">
      palette: {
        // type: "dark",
        text: {
          primary: "rgba(23, 43, 77)",
          secondary: "rgb(107, 119, 140)",
        },
        //   primary: {
        //     main: purple[200],
        //   },
        //   secondary: {
        //     main: green[500],
        //   },
      },
      shape: {
        borderRadius: "16px",
      },
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontWeightMedium: "600",
      },
    },
    local.shortName
  );

  theme.shadows[1] =
    "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px";
  return [local, theme];
}

export default useCustomTheme;
