import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List'
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { File, LinkVariant } from 'mdi-material-ui'
import { Delete, FolderOpen } from '@material-ui/icons'
import PropTypes from 'prop-types'
import pluginApi from '../plugin-api'

import styles from './TheShareList.css'

const { shell, shareList } = pluginApi

function TheShareList (props) {
  /*
   * list的格式：
   * [
   *  {
   *   "fileName": "Insomnia.Core-2020.5.2.dmg",
   *   "filePath": "/Users/xxx/Downloads/bt/Insomnia.Core-2020.5.2.dmg",
   *   "icon": "mdi-file",
   *   "id": "80c3f3b1-3b81-46af-80a3-8dff13b54a4f"
   *  }
   * ]
   */
  const [list, setList] = useState(shareList.getAllItems())

  useEffect(() => {
    shareList.addListChangeListener(setList)

    return function cleanup () {
      shareList.removeListChangeListener(setList)
    }
  })

  const copyShareLink = (id) => {
    props.onRequireCopyShareLink(id)
  }

  const openItemInFolder = (filePath) => {
    shell.openInDirectory(filePath)
  }

  const showQrCode = (id) => {
    props.onRequireShowQrcode(id)
  }

  const removeItem = (id) => {
    shareList.removeItem(id)
  }

  return (
    <List className={styles.root}>
      {list.map((item) => (
        <ListItem key={item.id} button={true} classes={{ button: styles.listItem }} onClick={ () => showQrCode(item.id) }>
          <ListItemIcon>
            <File/>
          </ListItemIcon>
          <ListItemText primary={item.fileName}/>
          <ListItemSecondaryAction>
            <IconButton onClick={() => copyShareLink(item.id)}>
              <LinkVariant/>
            </IconButton>
            <IconButton onClick={() => openItemInFolder(item.filePath)}>
              <FolderOpen/>
            </IconButton>
            <IconButton onClick={() => removeItem(item.id)}>
              <Delete/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>))
      }
    </List>
  )
}

TheShareList.propTypes = {
  onRequireShowQrcode: PropTypes.func,
  onRequireCopyShareLink: PropTypes.func
}

export default TheShareList
