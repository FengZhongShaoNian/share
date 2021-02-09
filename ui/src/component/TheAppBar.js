import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { LinkVariant, Qrcode } from 'mdi-material-ui'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: 1400
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function TheAppBar (props) {
  const classes = useStyles()

  const handleMenuButtonClick = () => {
    props.onMenuButtonClick()
  }

  const handleChange = (event) => {
    if (props.onServerSwitchStatusChange) {
      props.onServerSwitchStatusChange()
    }
  }

  const handleRequireShowQrcode = () => {
    props.onRequireShowQrcode()
  }

  const handleRequireCopyShareLink = () => {
    props.onRequireCopyShareLink()
  }

  return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ handleMenuButtonClick }>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My Share App
                    </Typography>
                    <IconButton color="inherit" onClick={ handleRequireShowQrcode }>
                        <Qrcode />
                    </IconButton>
                    <IconButton color="inherit" onClick={ handleRequireCopyShareLink }>
                        <LinkVariant />
                    </IconButton>
                    <Switch
                        checked={ props.serverIsRunning }
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Toolbar>
            </AppBar>
        </div>
  )
}

TheAppBar.propTypes = {
  onMenuButtonClick: PropTypes.func,
  onServerSwitchStatusChange: PropTypes.func,
  onRequireShowQrcode: PropTypes.func,
  onRequireCopyShareLink: PropTypes.func,
  serverIsRunning: PropTypes.bool
}

export default TheAppBar
