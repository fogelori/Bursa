import List from "@material-ui/core/List";
// import Routes from "../Router/Routes";
import ListMenuItemLink from "./ListMenuItemLink";
import { useGetMenuList } from "../Router/Routes";

const style = {
  rowList: {
    display: "flex",
    whiteSpace: "nowrap",
  },
};

function ListMenu(props) {
  const Routes = useGetMenuList();
  return (
    <div className="listMenuComponent">
      <List style={props.direction === "row" ? style.rowList : undefined}>
        {Routes.map((route) => (
          <>
            <ListMenuItemLink to={route.path} primary={route.name} />
          </>
        ))}
      </List>
    </div>
  );
}

export default ListMenu;
