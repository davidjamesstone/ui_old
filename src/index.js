import React from 'react'
import ReactDOM from 'react-dom'
import Index from './pages/index'
// import Paperbase from './components/Paperbase'
// import * as serviceWorker from './serviceWorker';
// import Button from '@material-ui/core/Button'

function App () {
  return (
    <Index />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
