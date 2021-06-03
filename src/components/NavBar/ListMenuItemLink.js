import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link as RouterLink } from "react-router-dom";

function ListMenuItemLink(props) {
  //took from https://material-ui.com/guides/composition/
  const { icon, primary, to } = props;
  let { path } = useRouteMatch();
  path = path === "/" ? "" : path + "/";

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={`${path}${to}`} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </>
  );
}

export default ListMenuItemLink;
