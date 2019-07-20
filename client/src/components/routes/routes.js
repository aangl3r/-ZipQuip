import AccountBox from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
//import MailIcon from '@material-ui/icons/Mail';
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
//import Inbox from "../Inbox/inbox";

const Routes = [
  {
    path: "/profile",
    drawerName: "profile",
    icon: AccountBox,
    component: Profile,
  },
/*   {
    path: "/inbox",
    sidebarName: "Inbox",
    icon: MailIcon,
    component: Inbox,
  }, */
  {
    path: "/",
    sidebarName: "Home",
    icon: HomeIcon,
    component: HomePage,
  },
];

export default Routes;
