import { Assignment } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const navigator = useNavigate();

  return (
    <Drawer
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <Typography
            variant="h6"
            component="div"
            className="w-full flex-grow cursor-pointer text-center text-2xl"
            onClick={() => navigator("/")}
          >
            ESL
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <div className="flex h-full flex-col justify-between">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator("/carts")}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText className="text-center" primary={"Carts"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator("/products")}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText className="text-center" primary={"Products"} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
