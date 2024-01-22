
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
  return (<div>Hello, Rails 7! TSX</div>)
}

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')
  ReactDOM.render(<App />, rootEl)
})
