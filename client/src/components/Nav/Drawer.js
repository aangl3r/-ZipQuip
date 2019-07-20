import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from "../routes/routes";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: -20
    },
}));

const DrawerButton = props => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {Routes.map((prop, key) => {
                    return (
                        <Link to={prop.path} key={key}>
                            <ListItem>
                                <ListItemIcon>
                                    <prop.icon />
                                </ListItemIcon>
                                <ListItemText primary={prop.drawerName} />
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
            <Divider />
        </div>
    );

    return (
        <div className={classes.menuButton}>
            <Button onClick={toggleDrawer('left', true)} >
                <MenuIcon />
            </Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

export default DrawerButton;