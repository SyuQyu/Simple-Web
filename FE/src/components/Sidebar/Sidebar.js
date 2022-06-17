import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { axios } from '../../service/service';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structureAdmin = [
  { id: 0, type: "title", label: "INFORMATION" },
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "About Us",
    link: "/app/about-us",
    icon: <FAQIcon />,
  },
  // {
  //   id: 5,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  { id: 2, type: "divider" },
  { id: 3, type: "title", label: "TABLES" },
  { id: 4, label: "Table User", link: "/app/users", icon: <TableIcon /> },
  { id: 5, label: "Table Paket", link: "/app/paket", icon: <TableIcon /> },
  { id: 6, label: "Table Jenis Laundry", link: "/app/jenisLaundry", icon: <TableIcon /> },
  { id: 7, label: "Table Member", link: "/app/member", icon: <TableIcon /> },
  { id: 8, label: "Table Order", link: "/app/order", icon: <TableIcon /> },
  { id: 9, label: "Table Pembayaran", link: "/app/pembayaran", icon: <TableIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 15,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 16,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 17,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

const structureKasier = [
  { id: 0, type: "title", label: "INFORMATION" },
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "About Us",
    link: "/app/about-us",
    icon: <FAQIcon />,
  },
  // {
  //   id: 5,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  { id: 2, type: "divider" },
  { id: 3, type: "title", label: "TABLES" },
  { id: 4, label: "Table Paket", link: "/app/paket", icon: <TableIcon /> },
  { id: 5, label: "Table Jenis Laundry", link: "/app/jenisLaundry", icon: <TableIcon /> },
  { id: 6, label: "Table Member", link: "/app/member", icon: <TableIcon /> },
  { id: 7, label: "Table Order", link: "/app/order", icon: <TableIcon /> },
  { id: 8, label: "Table Pembayaran", link: "/app/pembayaran", icon: <TableIcon /> },
  // { id: 9, type: "divider" },
  // { id: 10, type: "title", label: "PROJECTS" },
  // {
  //   id: 15,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 15,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 16,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  const [name, setName] = useState('');
  const [uLevel, setUlevel] = useState('');
  const [users, setUsers] = useState([]);
  const localStorageToken = localStorage.getItem("token");
  const localStorageUid = localStorage.getItem("userId");
  useEffect(() => {
      getUsers();
  }, []);

  const getUsers = async () => {
      const response = await axios.get(`/login/user/${localStorageUid}`);
      setUsers(response.data.refresh_token == localStorageToken? response.data : null);
  }
  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {users.u_level == 2 ? 
          structureAdmin.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))
        : 
        structureKasier.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))
        }
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
