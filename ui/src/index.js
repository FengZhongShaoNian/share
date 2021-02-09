import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import TheApp from './component/TheApp'

function Application () {
  return (
    <SnackbarProvider>
      <TheApp/>
    </SnackbarProvider>
  )
}

ReactDOM.render(<Application />, document.getElementById('app'))
