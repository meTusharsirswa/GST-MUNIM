import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
// import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Collapse } from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import App from "../../App";
// import Dashboard from '../Dashboard'
// import Account from "../Masters/Account";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const Navbar = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [masterOpen, setMasterOpen] = React.useState(false);
  const [manualOpen, setManualOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setManualOpen(true); // Indicate that the drawer is manually opened
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setManualOpen(false); // Indicate that the drawer is closed manually
  };

  const handleMasterClick = () => {
    setMasterOpen(!masterOpen);
    // navigate("/Masters")
  };
  const handleMouseEnter = () => {
    if (!open && !manualOpen) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (open && !manualOpen) setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#217B7E" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Munim Ji
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    ...(open && { mr: 3 }),
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton onClick={handleMasterClick}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                ...(open && { mr: 3 }),
              }}
            >
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Masters" sx={{ opacity: open ? 1 : 0 }} />
            {open ? masterOpen ? <ExpandLess /> : <ExpandMore /> : ""}
          </ListItemButton>
          {open && masterOpen && (
            <Collapse in={masterOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/Masters/Account"
                >
                  <ListItemText primary="Account" />
                </ListItemButton>
           
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/Masters/Product/Group"
                >
                  <ListItemText primary="Product Group" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/Masters/Unit"
                >
                  <ListItemText primary="Unit" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/Masters/Product"
                >
                  <ListItemText primary="Product" />
                </ListItemButton>
              </List>
            </Collapse>
          )}

          {[
            { text: "Sales", icon: <AttachMoneyIcon />, link: "/sales" },
            { text: "Purchase", icon: <ShoppingCartIcon />, link: "/purchase" },
            {
              text: "Stock Adjustment",
              icon: <InventoryIcon />,
              link: "/stock-adjustment",
            },
            { text: "Payment", icon: <PaymentIcon />, link: "/payment" },
            {
              text: "Expensens Income",
              icon: <TrendingUpIcon />,
              link: "/expenses-income",
            },
            {
              text: "Other Documents",
              icon: <DescriptionIcon />,
              link: "/other-documents",
            },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    ...(open && { mr: 3 }),
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: "Report", icon: <AssessmentIcon />, link: "/report" },
            { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    ...(open && { mr: 3 }),
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Add your page content here */}
        <App />
      </Box>
    </Box>
  );
};

export default Navbar;
