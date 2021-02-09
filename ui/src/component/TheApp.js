import React, { useEffect, useState } from 'react'
import { withSnackbar } from 'notistack'
import TheAppBar from './TheAppBar'
import TheDrawer from './TheDrawer'
import TheShareList from './TheShareList'
import { StylesProvider } from '@material-ui/core/styles'
import QrCodeDialog from './QrCodeDialog'
import PropTypes from 'prop-types'

import pluginApi from '../plugin-api'
const { server, config, clipboard, network } = pluginApi

const SnackBarMessageType = {
  default: 'default',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

function TheApp (props) {
  const [serverIsRunning, setServerIsRunning] = useState(server.isRunning())
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false)
  const [qrCodeData, setQrCodeData] = useState('')

  useEffect(() => {
    const callback = () => {
      setServerIsRunning(server.isRunning)
    }
    server.registerServerStatusChangeListener(callback)

    return function cleanup () {
      server.removeServerStatusChangeListener(callback)
    }
  })

  const handleMenuButtonClick = () => {
    if (openDrawer) {
      setOpenDrawer(false)
    } else {
      setOpenDrawer(true)
    }
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const getIp = (netCard) => {
    if (!netCard) {
      const netCards = network.getAllNetCards()
      if (netCards.length === 1) {
        netCard = netCards[0]
      } else if (netCards.length > 1) {
        showMessage('该计算机具有多个网卡，请先选择合适的网卡', SnackBarMessageType.error)
        return undefined
      } else {
        showMessage('该计算机似乎没有可用的网卡', SnackBarMessageType.error)
        return undefined
      }
    }
    return network.getIpv4AddressByNetCard(netCard)
  }

  const handleRequireShowQrcode = (id) => {
    const ip = getIp(config.getNetCard())
    if (!ip) {
      showMessage('获取不到本机的局域网IP', SnackBarMessageType.error)
      return
    }
    const port = config.getPort()
    if (id) {
      setQrCodeData(`http://${ip}:${port}/files/${id}`)
    } else {
      setQrCodeData(`http://${ip}:${port}/`)
    }
    setOpenQrCodeDialog(true)
  }

  const handleQrCodeDialogClose = () => {
    setOpenQrCodeDialog(false)
  }

  const handleServerSwitchStatusChange = () => {
    if (serverIsRunning) {
      server.stop().then(() => {
        setServerIsRunning(false)
      })
    } else {
      const port = config.getPort()
      server.start(port).then(() => {
        setServerIsRunning(true)
      }).catch((error) => {
        setServerIsRunning(false)
        showMessage(error.message, SnackBarMessageType.error)
      })
    }
  }

  const handleCopyShareLink = (id) => {
    const ip = getIp(config.getNetCard())
    if (!ip) {
      showMessage('获取不到本机的局域网IP', SnackBarMessageType.error)
      return
    }
    const port = config.getPort()
    let text = `http://${ip}:${port}/`
    if (id) {
      text = `http://${ip}:${port}/files/${id}`
    }
    if (clipboard.copyText(text)) {
      showMessage('分享链接已经拷贝到剪切板', SnackBarMessageType.success)
    } else {
      showMessage('拷贝链接失败', SnackBarMessageType.error)
    }
  }

  const showMessage = (message, type) => {
    // type: success, error, warning, info, or default
    props.enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  }

  return (
        <div>
            <StylesProvider injectFirst>
                <TheAppBar
                    serverIsRunning = {serverIsRunning}
                    onMenuButtonClick={ handleMenuButtonClick }
                    onRequireShowQrcode={handleRequireShowQrcode}
                    onServerSwitchStatusChange = {handleServerSwitchStatusChange}
                    onRequireCopyShareLink = {handleCopyShareLink}
                />
                <TheDrawer open={openDrawer} onDrawerClose={ handleDrawerClose }/>
                <TheShareList onRequireShowQrcode={ handleRequireShowQrcode } onRequireCopyShareLink={ handleCopyShareLink} />
                <QrCodeDialog open={openQrCodeDialog} qrCodeData={qrCodeData} onClose={ handleQrCodeDialogClose }/>
            </StylesProvider>
        </div>
  )
}

TheApp.propTypes = {
  enqueueSnackbar: PropTypes.func
}

export default withSnackbar(TheApp)
