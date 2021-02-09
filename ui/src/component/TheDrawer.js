import React, { useState } from 'react'
import { Divider, Drawer, Input, InputAdornment, MenuItem, Select, Switch, Toolbar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import RouterIcon from '@material-ui/icons/Router'
import FolderIcon from '@material-ui/icons/Folder'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { FileImport } from 'mdi-material-ui'
import FolderSelector from './FolderSelector'
import PropTypes from 'prop-types'

import styles from './TheDrawer.css'

import pluginApi from '../plugin-api'
const { config, network } = pluginApi

function TheDrawer (props) {
  const [state, setState] = useState({
    serverPort: config.getPort(),
    showPassword: false,
    password: config.getPassword(),
    networkCardList: network.getAllNetCards(),
    networkCard: config.getNetCard(),
    allowUpload: config.getAllowUpload(),
    storageDirectory: config.getStorageDirectory()
  })

  const handleClose = () => {
    props.onDrawerClose()
  }
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }
  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value })
    if (prop === 'serverPort') {
      config.savePort(event.target.value)
    } else if (prop === 'password') {
      config.savePassword(event.target.value)
    } else if (prop === 'networkCard') {
      config.saveNetCard(event.target.value)
    } else if (prop === 'storageDirectory') {
      config.saveStorageDirectory(event.target.value)
    }
  }
  const handleSwitchStateChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.checked })
    if (prop === 'allowUpload') {
      config.saveAllowUpload(event.target.checked)
    }
  }

  const handleStorageFolderSelected = (folderPath) => {
    console.log('handleStorageFolderSelected folderPath:', folderPath)
    config.saveStorageDirectory(folderPath)
    setState({ ...state, storageDirectory: folderPath })
  }

  return (
    <Drawer anchor="left" open={props.open} onClose={handleClose}>
      <Toolbar></Toolbar>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={styles.root}>
        <Divider className={styles.divider}/>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon/>
          </ListItemIcon>
          <ListItemText primary="服务端口"/>
          <ListItemSecondaryAction>
            <Input
              value={state.serverPort}
              onChange={handleChange('serverPort')}
              className={styles.inputControl}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <RouterIcon/>
          </ListItemIcon>
          <ListItemText primary="网卡名称"/>
          <ListItemSecondaryAction>
            <Select
              className={styles.inputControl}
              value={state.networkCard}
              onClick={handleChange('networkCard')}
            >
              {
                state.networkCardList.map((value) =>
                  <MenuItem key={value} value={value}> {value}</MenuItem>
                )
              }
            </Select>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <VerifiedUserIcon/>
          </ListItemIcon>
          <ListItemText primary="验证密码"/>
          <ListItemSecondaryAction>
            <Input
              value={state.password}
              onChange={handleChange('password')}
              type={state.showPassword ? 'text' : 'password'}
              className={styles.inputControl}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClickShowPassword}
                  >
                    {state.showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider className={styles.divider}/>
        <ListItem>
          <ListItemIcon>
            <FileImport/>
          </ListItemIcon>
          <ListItemText primary="允许上传"/>
          <ListItemSecondaryAction>
            <Switch
              size="small"
              checked={state.allowUpload}
              onChange={handleSwitchStateChange('allowUpload')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon/>
          </ListItemIcon>
          <ListItemText primary="存储目录"/>
          <ListItemSecondaryAction>
            <Input
              className={styles.inputControl}
              value={state.storageDirectory}
              onChange={handleChange('storageDirectory')}
              endAdornment={
                <InputAdornment position="end">
                  <FolderSelector onFolderSelectedChange={handleStorageFolderSelected}/>
                </InputAdornment>
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Drawer>
  )
}

TheDrawer.propTypes = {
  open: PropTypes.bool,
  onDrawerClose: PropTypes.func
}

export default TheDrawer
