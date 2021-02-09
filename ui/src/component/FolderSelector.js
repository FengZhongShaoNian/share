import React, { useRef } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import styles from './FolderSelector.css'
import PropTypes from 'prop-types'

import pluginApi from '../plugin-api'
const { shell } = pluginApi

function FolderSelector (props) {
  const folderSelectorRef = useRef()

  const handleSelectButtonClick = () => {
    if (shell.selectDirectory !== undefined) {
      try {
        // 选择文件夹的时候
        // utools窗口会暂时被隐藏
        // 为了防止窗口不可见的时候退出插件
        // 这里设置一个标识
        window.preventPluginOut = true
        const selectedFolders = shell.selectDirectory()
        if (selectedFolders !== undefined && selectedFolders.length !== 0) {
          props.onFolderSelectedChange(selectedFolders[0])
        }
        return
      } finally {
        setTimeout(() => { window.preventPluginOut = false }, 5000)
      }
    }
    // 当不是在utools中运行时
    folderSelectorRef.current.click()
  }

  const handleFolderSelected = (event) => {
    console.log('handleFolderSelected event：', event)
    console.log('handleFolderSelected value：', event.target.value)
    if (props.onFolderSelectedChange) {
      const filePath = event.target.files[0].path
      event.target.value = ''
      let index = filePath.lastIndexOf('/')
      if (index === -1) {
        index = filePath.lastIndexOf('\\')
      }
      const folderPath = filePath.substring(0, index)
      console.log('handleFolderSelected folderPath:', folderPath)
      props.onFolderSelectedChange(folderPath)
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={handleSelectButtonClick}>
        <MoreHorizIcon/>
      </IconButton>
      <input
        type="file"
        ref={folderSelectorRef}
        className={styles.hideElement}
        webkitdirectory="true"
        onChange={handleFolderSelected}
      />
    </div>
  )
}

FolderSelector.propTypes = {
  onFolderSelectedChange: PropTypes.func
}

export default FolderSelector
