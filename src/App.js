import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import Tour from './Tour.js';
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import './App.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Wallpaper from './categories/Wallpaper';
import Nature from './categories/Nature';
import Technology from './categories/Technology.js';
import Athletics from './categories/Athletics.js';
import Fashion from './categories/Fashion.js';
import Travel from './categories/Travel.js';
import Covid from './categories/Covid.js';
import Baw from './categories/Baw.js';
import People from './categories/People';
import {ReactComponent as ReactLogo} from './icons/homeicon.svg';
import {ReactComponent as FashionIcon} from './icons/fashionicon.svg';
import {ReactComponent as AthleticsIcon} from './icons/athleticsicon.svg';
import {ReactComponent as TechnologyIcon} from './icons/technologyicon.svg';
import {ReactComponent as NatureIcon} from './icons/natureicon.svg';
import {ReactComponent as WallpaperIcon} from './icons/wallpapericon.svg';
import {ReactComponent as TravelIcon} from './icons/travelicon.svg';
import {ReactComponent as CovidIcon} from './icons/covidicon.svg';
import {ReactComponent as BawIcon} from './icons/bawicon.svg';
import {ReactComponent as PeopleIcon} from './icons/peopleicon.svg';
import {ReactComponent as GithubIcon} from './icons/githubicon.svg';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NetworkDetector from './Hoc/NetworkDetector';
import Tooltip from '@material-ui/core/Tooltip';
import Search from './components/search/Search'

const drawerWidth = 240;
const history = createBrowserHistory();
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

//newly added.................................................//
const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  
  <div>
    <AppBar style={{position:'fixed'}}  className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton,"tour-logo"}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon fontSize="30px" />
        </IconButton>
        <Typography className={classes.title}>
            Image Search App
          </Typography><Tour />
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
            <ReactLogo height='30px' />&nbsp;&nbsp;<ListItemText>Home</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem
            button
            component={Link}
            to="/Wallpaper"
            onClick={onItemClick("Wallpaper")}
          >
            <WallpaperIcon height='30px' />&nbsp;&nbsp;<ListItemText>Wallpaper</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Technology" 
          onClick={onItemClick("Technology")}>
            <TechnologyIcon height='30px' />&nbsp;&nbsp;<ListItemText>Technology</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Fashion" 
          onClick={onItemClick("Fashion")}>
            <FashionIcon height='30px' />&nbsp;&nbsp;<ListItemText>Fashion</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Athletics" 
          onClick={onItemClick("Athletics")}>
            <AthleticsIcon height='30px' />&nbsp;&nbsp;<ListItemText>Athletics</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/People" 
          onClick={onItemClick("People")}>
            <PeopleIcon height='30px' />&nbsp;&nbsp;<ListItemText>People</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Travel" 
          onClick={onItemClick("Travel")}>
            <TravelIcon height='30px' />&nbsp;&nbsp;<ListItemText>Travel</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Nature" 
          onClick={onItemClick("Nature")}>
            <NatureIcon height='30px' width='30px' />&nbsp;&nbsp;<ListItemText>Nature</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Baw" 
          onClick={onItemClick("Baw")}>
            <BawIcon height='30px' width='30px' />&nbsp;&nbsp;<ListItemText>Business & work</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem 
          button
          component={Link}
          to="/Covid" 
          onClick={onItemClick("Covid")}>
            <CovidIcon height='30px' />&nbsp;&nbsp;<ListItemText>Covid-19</ListItemText>
          </ListItem><Divider variant="middle" />
          <ListItem>
          <Typography style={{textAlign:"left",  alignItems:"center", fontSize:"10px"}}>Developed and maintained by <a style={{textDecoration:"none"}} target='_blank' href="https://twitter.com/shubham53468721">shubham</a> &nbsp;&nbsp;<a target='_blank' href="https://github.com/shubham2924/React-image-search-app"><GithubIcon height='20px' /></a>
  </Typography>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Search} />
        <Route path="/wallpaper" component={Wallpaper} />
        <Route path="/technology" component={Technology} />
        <Route path="/fashion" component={Fashion} />
        <Route path="/athletics" component={Athletics} />
        <Route path="/travel" component={Travel} />
        <Route path="/nature" component={Nature} />
        <Route path="/covid" component={Covid} />
        <Route path="/baw" component={Baw} />
        <Route path="/people" component={People} />
      </main>
    </Router>
  )
);
//newly added till here..........................................//

//export default class App extends Component {
 const App = ({ variant }) => { 
  const [theme, setTheme] = useState(() => localStorage.getItem("DARK_MODE"));
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}

useEffect(() => {
  localStorage.setItem("DARK_MODE", theme);
}, [theme]);

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
        <button className="tour-cart" style={{float:'right', cursor:'pointer' , width:'35px', height:'35px' , paddingRight:'15px',border: 'none', outline:'none' , backgroundColor: 'transparent' }} onClick={themeToggler}>
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={35}
      moonColor="white"
      sunColor="white"
      
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
