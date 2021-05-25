import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CountUp from "react-countup";
import AutoTrendingIconDirection from "../../../../../icons/AutoTrendingIconDirection";

function FinanceItem(props) {
  console.log("FinanceItem Rendered");

  return (
    <Box /*width="max-content"*/ py={2} flexBasis="50%">
      <Typography variant="subtitle1" component="h6" color="textSecondary">
        {props.name}
      </Typography>
      {props.amount && (
        <Typography variant="h4" component="h4">
          <CountUp
            start={0}
            end={props.amount}
            duration={3}
            deplay={2}
            separator=","
            decimals={1}
            decimal="."
          />
          M
        </Typography>
      )}
      {props.change && (
        <Typography variant="body2" component="p">
          <AutoTrendingIconDirection number={props.change} />
          {props.change}% in last period
        </Typography>
      )}
    </Box>
  );
}

export default React.memo(FinanceItem);
