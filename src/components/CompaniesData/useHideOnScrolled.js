import { useRef, useLayoutEffect } from "react";
import { useHideHeaderUpdater } from "../../hideHeaderStore";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const useHideOnScrolled = (elRef) => {
  //   const [hidden, setHidden] = useState(false);
  const setHidden = useHideHeaderUpdater();
  const prevScrollpos = useRef(0);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useLayoutEffect(() => {
    const handleScroll = debounce((event) => {
      // if (event.target.className == elRef.current.className) {
      console.log("scroll handler");
      const currentScrollPos = event.target.scrollTop - event.target.offsetTop;
      const hiddenHeader =
        prevScrollpos.current <= currentScrollPos && event.target.scrollTop > 1;
      prevScrollpos.current = currentScrollPos;
      setHidden(hiddenHeader);
      // }
    }, 100);

    if (elRef.current && smallScreen) {
      const elRefConst = elRef.current;
      elRefConst?.addEventListener("scroll", handleScroll, true);
      return () => {
        elRefConst?.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [elRef.current?.className, elRef, setHidden, smallScreen]);

  //   return hidden;
};

export default useHideOnScrolled;
