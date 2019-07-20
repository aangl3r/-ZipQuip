import AccountBox from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Inbox from "../Inbox/Inbox";

const Routes = [
    {
        path: "/",
        drawerName: "Home",
        icon: HomeIcon,
        component: HomePage,
    },
    {
        path: "/profile",
        drawerName: "Profile",
        icon: AccountBox,
        component: Profile,
    },
    {
        path: "/inbox",
        drawerName: "Inbox",
        icon: MailIcon,
        component: Inbox,
    },

];

export default Routes;
