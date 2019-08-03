import AccountBox from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import Dashboard from '@material-ui/icons/Dashboard';
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Inbox from "../Inbox/Inbox";
import View from "../CommentPage/View"

const Routes = [
    {
        path: "/Home",
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
    {
        path: "/view",
        drawerName: "View",
        icon: Dashboard,
        component: View,
    },

];

export default Routes;
