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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
//var data = require('./data')
import defaultData from './data';
import { Collapse } from '@material-ui/core';
import SearchBar from './uicomponent/SearchBar'
import CandidateItem from './uicomponent/CandidateItem'
import TodoItemHolder from './uicomponent/TodoItemHolder';

import liff from './utils/liffHelper';

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
    selectedIndex: -1,
    filterText: '',
    filterDone: 'all'
  };

  componentDidMount() {
    //console.log('componentDidMount liff:', liff.init().then((res) => console.log('ress:',res)))
    liff.init().then((data) => {
      console.log('componentDidMount init:', data);
      axios({
        url: `https://linetestingserver.herokuapp.com/line/istmnewa/${data.context.userId}`,
        method: 'get'
      }).then(res => {
        console.log('istmnewa:', res.data.isTmnewa);
        
      })
    })
    // liff.getProfile()
    //   .then((profile) => {
    //     console.log('profile:', profile)
    //   });
  }

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

  addItem = (item, taskIdx) => {
    //selectedIdx>-1=> edit mode
    if (taskIdx > -1) {
      this.setState((state) => {
        return {
          projectList: [...state.projectList.slice(0, state.selectedIndex),
          Object.assign({}, state.projectList[state.selectedIndex],
            {
              todoItems: [...state.projectList[state.selectedIndex].todoItems.slice(0, taskIdx),
              Object.assign({}, state.projectList[state.selectedIndex].todoItems[taskIdx], item),
              ...state.projectList[state.selectedIndex].todoItems.slice(taskIdx + 1)
              ]
            })
          ]
        }
      })

    } else {
      this.setState((state) => {
        return {
          projectList: [...state.projectList.slice(0, state.selectedIndex),
          Object.assign({}, state.projectList[state.selectedIndex],
            { todoItems: [...state.projectList[state.selectedIndex].todoItems, item] }),
          ...state.projectList.slice(state.selectedIndex + 1)]
        }
      })
    }
  }

  delItem = (idx) => {
    console.log('checkItem', idx, [...this.state.projectList[this.state.selectedIndex].todoItems]);
    //console.log('checkItem', idx,[...this.state.projectList[this.state.selectedIndex].todoItems].splice(idx,1));
    this.setState((state) => {
      let tmp = [...state.projectList[state.selectedIndex].todoItems];
      tmp.splice(idx, 1)
      return {
        projectList: [...state.projectList.slice(0, state.selectedIndex),
        Object.assign({}, state.projectList[state.selectedIndex],
          { todoItems: tmp }),
        ...state.projectList.slice(state.selectedIndex + 1)]
      }
    })
  }

  filterItem = (evt, searchText) => {
    console.log('evt', evt.target.name);
    console.log('searchText', searchText);

    if (evt.target.name === 'itemFilter') {
      this.setState((state) => {
        return {
          filterDone: searchText
        };
      })

    } else {
      this.setState((state) => {
        return {
          filterText: searchText
        }
      })
    }

  }

  checkItem = (idx) => {
    //console.log('checkItem', idx, this.state.projectList[idx]);
    this.setState((state) => {
      return {
        projectList: [...state.projectList.slice(0, state.selectedIndex),
        Object.assign({}, state.projectList[state.selectedIndex],
          {
            todoItems: [...state.projectList[state.selectedIndex].todoItems.slice(0, idx),
            Object.assign({}, state.projectList[state.selectedIndex].todoItems[idx], { isDone: !state.projectList[state.selectedIndex].todoItems[idx].isDone }),
            ...state.projectList[state.selectedIndex].todoItems.slice(idx + 1)
            ]
          }),
        ...state.projectList.slice(state.selectedIndex + 1)]
      };
    })
  }

  cancelNewProject = () => this.setState((state) => {
    return { isOpenAdd: false }
  })

  render() {
    const { classes, theme } = this.props;
    //console.log('render projectList', this.state.projectList);
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
                      return { selectedIndex: index }
                    })
                  }}
                >
                  <ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <AssignmentIcon />}</ListItemIcon>
                  <ListItemText primary={project.projectName} />
                  <MoreHorizIcon />
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
              TodoList
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>

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
          <SearchBar project={this.state.projectList[this.state.selectedIndex] ? this.state.projectList[this.state.selectedIndex] : {}} filterItem={this.filterItem} />
          <TodoItemHolder project={this.state.projectList[this.state.selectedIndex] ? this.state.projectList[this.state.selectedIndex] : {}}
            addItem={this.addItem}
            checkItem={this.checkItem}
            delItem={this.delItem}
            filterText={this.state.filterText}
            filterDone={this.state.filterDone}
          />
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
