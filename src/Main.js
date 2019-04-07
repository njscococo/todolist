import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

//var data = require('./data')
import defaultData from './data';
import { Collapse } from '@material-ui/core';
import SearchBar from './uicomponent/SearchBar'
import CandidateItem from './uicomponent/CandidateItem'
import TodoItemHolder from './uicomponent/TodoItemHolder';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    projectList: defaultData.data[0].projects,
    showProject: false,
    isOpenAdd: false,
    selectedItem: {}

  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleShowProject = () => {
    this.setState((state) => {
      return { showProject: !state.showProject }
    })
  }

  addProject = (item) => {
    this.setState((state) => {
      return { projectList: [...state.projectList, item] }
    })
  }

  addItem = (item) => {
    console.log('Main addItem',this.state.selectedItem.todoItems, item);
    
    // this.setState((state) => {
    //   return 
    // })
  }

  cancelNewProject = () => this.setState((state) => {
    return { isOpenAdd: false }
  })

  

  render() {
    const { classes, theme } = this.props;
    //console.log(classes);
    //console.log(theme);

    const drawer = (
      <div>
        <div className={classes.toolbar} ></div>
        <Divider />
        <List>
          <ListItem button onClick={this.handleShowProject}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Projects' />
            <AddIcon onClick={() => this.setState((state) => {
              return { isOpenAdd: true }
            })} />
            {this.state.showProject ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.showProject} timeout="auto" unmountOnExit>
            <List component='div' disablePadding>
              {this.state.isOpenAdd ? (<CandidateItem items={this.state.projectList}
                isOpen={this.cancelNewProject} addItem={this.addProject} />) : null}

              {this.state.projectList.map((project, index) => (
                <ListItem button key={project.projectName} className={classes.nested}
                  onClick={() => {
                    this.setState((state) => {
                      return { selectedItem: this.state.projectList[index]}
                    })
                  }}
                >
                  <ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <AssignmentIcon />}</ListItemIcon>
                  <ListItemText primary={project.projectName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <SearchBar />
          <TodoItemHolder project={this.state.selectedItem} addItem={this.addItem}/>
          {/* <Typography paragraph>
            maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography> */}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
