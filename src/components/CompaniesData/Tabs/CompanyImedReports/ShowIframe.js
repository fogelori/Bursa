import React from "react";
import "./ShowIframe.css";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function ShowIframe(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const includeHTML = props.url.includes("RHtm");
  const htmlInFullscreen = fullScreen & includeHTML;

  return (
    <Box overflow="hidden" flexGrow={1}>
      <iframe
        src={props.url}
        scrolling="yes"
        id="iframe"
        title="iframe"
        // onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));'
        frameBorder="no"
        // height="942"
        // width="1168"
        // width="310"
        // height="350"
        width="100%"
        height="100%"
        {...(htmlInFullscreen && {
          height: "1670",
          width: "1890",
          style: { transform: "scale(0.165)", transformOrigin: "0% 0%" },
        })}
      />
    </Box>
  );
}

export default ShowIframe;
