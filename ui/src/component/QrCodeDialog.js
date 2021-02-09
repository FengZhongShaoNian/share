import React from 'react'
import { Dialog, Paper } from '@material-ui/core'
import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'

import styles from './QrCodeDialog.css'

function QrCodeDialog (props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Paper className={styles.root}>
        <QRCode value={props.qrCodeData} size={192} />
      </Paper>
    </Dialog>
  )
}

QrCodeDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  qrCodeData: PropTypes.string
}

export default QrCodeDialog
