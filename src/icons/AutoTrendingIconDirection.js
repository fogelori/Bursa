import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const AutoTrendingIconDirection = ({ number }) => {
  if (number > 0) {
    return <TrendingUpIcon style={{ color: green[700] }} fontSize="small" />;
  } else if (number < 0) {
    return <TrendingDownIcon style={{ color: red[500] }} fontSize="small" />;
  } else {
    return <TrendingFlatIcon fontSize="small" />;
  }
};

export default AutoTrendingIconDirection;
