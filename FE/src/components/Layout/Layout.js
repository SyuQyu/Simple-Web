import React, { useState, useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import aboutUs from "../../pages/aboutus/aboutUs.js";
import Maps from "../../pages/maps";
// admin
import TablesPaket from "../../pages/tables/admin/TablePaket";
import TablesMember from "../../pages/tables/admin/TablesMember";
import TablesPembayaran from "../../pages/tables/admin/TablePembayaran";
import TablesOrder from "../../pages/tables/admin/TableOrder";
import TablesUser from "../../pages/tables/admin/TableUser";
import TablesJenisLaundry from "../../pages/tables/admin/TableJenisLaundry.js";
// kasier
import TablesPaketAdmin from "../../pages/tables/kasier/TablesPaket";
import TablesMemberAdmin from "../../pages/tables/kasier/TablesMember";
import TablesPembayaranAdmin from "../../pages/tables/kasier/TablePembayaran";
import TablesOrderAdmin from "../../pages/tables/kasier/TableOrder";
import TablesJenisLaundryAdmin from "../../pages/tables/kasier/TableJenisLaundry.js";

import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { axios } from '../../service/service';

function Layout(props) {
  var classes = useStyles();
  const [name, setName] = useState('');
  const [uLevel, setUlevel] = useState('');
  const [users, setUsers] = useState([]);
  const localStorageToken = localStorage.getItem("token");
  const localStorageUid = localStorage.getItem("userId");
  // global
  var layoutState = useLayoutState();
  useEffect(() => {
      getUsers();
  }, []);

  const getUsers = async () => {
      const response = await axios.get(`/login/user/${localStorageUid}`);
      setUsers(response.data.refresh_token == localStorageToken? response.data : null);
  }

  return (
    
    <div className={classes.root}>
        <>
        {console.log(users)}
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/about-us" component={aboutUs} />
              {users.u_level == 2 ? 
              <>
                <Route path="/app/users" component={TablesUser} />
                <Route path="/app/paket" component={TablesPaket} />
                <Route path="/app/jenisLaundry" component={TablesJenisLaundry} />
                <Route path="/app/member" component={TablesMember} />
                <Route path="/app/order" component={TablesOrder} />
                <Route path="/app/pembayaran" component={TablesPembayaran} />
              </>
              :
              <>
                <Route path="/app/paket" component={TablesPaketAdmin} />
                <Route path="/app/member" component={TablesMemberAdmin} />
                <Route path="/app/jenisLaundry" component={TablesJenisLaundryAdmin} />
                <Route path="/app/order" component={TablesOrderAdmin} />
                <Route path="/app/pembayaran" component={TablesPembayaranAdmin} />
              </>
              }
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
