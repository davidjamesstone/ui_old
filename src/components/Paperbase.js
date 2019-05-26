import React from 'react'
import PropTypes from 'prop-types'
import { Route, Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Navigator from './Navigator'
import Header from './Header'
import history from '../history'
// import NotFound from '../404'
import api from '../api'
import Table from './Table'
import ItemViewer from './ItemViewer'
import ItemEditor from './ItemEditor'
import Designer from './designer'

// import SchemaForm from 'jsonschema-form-for-material-ui'
// const columns = ['Name', 'Company', 'City', 'State']

// const data = [
//   ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
//   ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
//   ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
//   ['James Houston', 'Test Corp', 'Dallas', 'TX']
// ]

// const options = {
//   filterType: 'checkbox'
// }

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3'
    }
  },
  shape: {
    borderRadius: 8
  }
})

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c'
      }
    },
    MuiButton: {
      label: {
        // textTransform: 'initial'
      } // ,
      // contained: {
      //   boxShadow: 'none',
      //   '&:active': {
      //     boxShadow: 'none'
      //   }
      // }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        margin: '0 16px',
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854'
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
}

const drawerWidth = 256

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1'
  }
}

class Paperbase extends React.Component {
  state = {
    mobileOpen: false,
    page: 0,
    count: 100,
    data: []
  }

  componentDidMount () {
    api.get('/app')
      .then(result => {
        const app = result.data
        this.setState({ app })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render () {
    const { admin = true, classes } = this.props
    const { app } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation='js'>
                <Navigator
                  app={app}
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant='temporary'
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation='css'>
                <Navigator app={app} PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            </nav>
            <div className={classes.appContent}>
              <Route path='/designer/db' render={props => (
                <Header
                  title='Database'
                  onDrawerToggle={this.handleDrawerToggle}
                  links={[
                    { text: 'Diagram', path: `${props.match.path}/diagram` },
                    { text: 'Tables', path: `${props.match.path}/tables` },
                    { text: 'Edit', path: `${props.match.path}/editor` },
                    { text: 'Settings', path: `${props.match.path}/settings` }
                  ]} />
              )} />

              <main className={classes.mainContent}>
                {/* <Switch> */}
                {app && (
                  <React.Fragment>
                    <Route path='/table/:name' exact render={props => <Table {...props} app={app} />} />
                    <Route path='/table/:name/:id' exact render={props => <ItemViewer {...props} app={app} />} />
                    <Route path='/table/:name/:id/edit' exact render={props => <ItemEditor {...props} app={app} />} />
                    {admin && (
                      <React.Fragment>
                        <Route path='/designer/db/diagram' exact render={props => <Designer.Db.Diagram {...props} app={app} />} />
                        <Route path='/designer/db/editor' exact render={props => <Designer.Db.Editor {...props} app={app} />} />
                        <Route path='/designer/db/tables' exact render={props => <Designer.Db.Tables {...props} app={app} />} />
                        <Route path='/designer/db/tables/:name' exact render={props => <Designer.Db.Table {...props} app={app} />} />
                        <Route path='/designer/quality/test-lab' exact render={props => <Designer.TestLab {...props} app={app} />} />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

                {/* <Route path='/project/:projectId' render={props => <Project {...props} data={data} />} /> */}
                {/* <Route path='/project/:id/template-types' exact render={props => <Home {...props} data={data} />} /> */}
                {/* <Route path='/u/:username' exact render={props => <User {...props} />} />
                    <Route path='/u/:username/:modulename' exact render={props => <Module {...props} />} />
                    <Route path='/u/:username/:modulename/:tag+' exact render={props => <Version {...props} />} /> */}
                {/* <Route path='/tbl' exact render={props => <Example />} /> */}
                {/* <Route component={NotFound} />
                </Switch> */}
              </main>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Paperbase)
