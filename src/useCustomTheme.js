import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

function useCustomTheme(localproperty = "ltr") {
  const [local /*setLocal*/] = useState(localproperty);

  const theme = createMuiTheme({
    direction: local, // Both here and <body dir="rtl">
    palette: {
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
  });

  theme.shadows[1] =
    "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px";
  return [local, theme];
}

export default useCustomTheme;
