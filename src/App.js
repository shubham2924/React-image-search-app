import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import {Sugar} from 'react-preloaders';
import './App.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Users from './Users';
import About from './About'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  
  Divider,
  
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import NetworkDetector from './Hoc/NetworkDetector';

import Tooltip from '@material-ui/core/Tooltip';

import Search from './components/search/Search'

const drawerWidth = 240;
const history = createBrowserHistory();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   list: {
//     width: 250,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});


// const [theme, setTheme] = useState('light');
//   const themeToggler = () => {
//     theme === 'light' ? setTheme('dark') : setTheme('light')
//   }
  
//   const [isDarkMode, setDarkMode] = React.useState(false);
  
//   const toggleDarkMode = (checked = false) => {
//     setDarkMode(checked);
//   };
//newly added.................................................//
const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  
  <div>
    <AppBar style={{position:'fixed'}}  className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon fontSize="30px" />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            Image Search App
          </Typography>
          {/* <div>
      <Tooltip title="Dark Mode" placement="right-end">
        <button style={{float:'right', cursor:'pointer' , width:'35px', height:'35px' , paddingRight:'15px',border: 'none', outline:'none' , backgroundColor: 'transparent' }} onClick={themeToggler}>
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={35}
      moonColor="white"
      sunColor="black"
      
    />
    </button>
        </Tooltip>
        </div> */}

      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </div>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Search")}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/About"
            onClick={onItemClick("About")}
          >
            <ListItemText>Wallpaper</ListItemText>
          </ListItem>
          <ListItem button onClick={onItemClick("Page 3")}>
            <ListItemText>Page 3</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Search} />
        <Route path="/about" component={About} />
      </main>
    </Router>
  )
);
//newly added till here..........................................//

//export default class App extends Component {
 const App = ({ variant }) => { 
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}

const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked = false) => {
    setDarkMode(checked);
  };

  //newly added...............................................//
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Home");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };
  //newly added till here..........................................//


//    const [loading, setLoading] = useState(false);

// useEffect(()=>{
//   setLoading(true)
//   setTimeout(()=>{
//     setLoading(false)
//   }, 3500)
// }, [])
 
// const classes = useStyles();

//this is for swipeable drawer
// const [drawerAnchor, setDrawerAnchor] = React.useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setDrawerAnchor(open);
//   };




  //render() {
    return (
    <div className="app"> 
    {/* {
      loading?
      <Sugar animation="slide-right"
             color={'#fff'}
             time={3000}
       />
      : */}

    
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>  
      <div className='search'>

      <div >
      
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
      <div className="dmode">
    <Tooltip title="Dark Mode" placement="right-end">
        <button style={{float:'right', cursor:'pointer' , width:'35px', height:'35px' , paddingRight:'15px',border: 'none', outline:'none' , backgroundColor: 'transparent' }} onClick={themeToggler}>
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={35}
      moonColor="white"
      sunColor="black"
      
    />
    </button>
        </Tooltip></div>
    </div>
      </div>
      </>
    </ThemeProvider>
 
    </div> 
    )
  }
//}
 export default NetworkDetector(App);
// export default withStyles(styles)(App);