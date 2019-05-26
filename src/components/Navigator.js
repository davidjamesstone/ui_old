import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PublicIcon from '@material-ui/icons/Public'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import TimerIcon from '@material-ui/icons/Timer'
import SettingsIcon from '@material-ui/icons/Settings'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'
import TableChartIcon from '@material-ui/icons/TableChart'

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Authentication', icon: <PeopleIcon />, active: true },
      { id: 'Database', icon: <DnsRoundedIcon />, url: '/designer/db/diagram' },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      { id: 'Router', icon: <SettingsInputComponentIcon /> }
    ]
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon />, url: '/designer/quality/test-lab' }
    ]
  }
]

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  itemLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
})

function Navigator (props) {
  const { classes, app, ...other } = props
  const menu = categories.slice()

  let name = 'stoneware'

  if (app) {
    name = app.name

    menu.push({
      id: 'Tables',
      children: app.tables.map(tbl => ({
        id: tbl.displayName,
        icon: <TableChartIcon />,
        url: `/table/${tbl.name}`
      }))
    })
  }

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
          {name}
        </ListItem>
        <ListItem className={classNames(classes.item, classes.itemCategory)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        {menu.map(({ id, url, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                <NavLink to={url || '/'} className={classes.itemLink}>{id}</NavLink>
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, url }) => (
              <ListItem
                button
                dense
                key={childId}
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  active && classes.itemActiveItem
                )}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense
                  }}
                >
                  <NavLink to={url || '/'} className={classes.itemLink}>{childId}</NavLink>
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navigator)
