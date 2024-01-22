// Entry point for the build script in your package.json

import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
  return (<div>Hello, Rails 7!</div>)
}

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app')
  ReactDOM.render(<App />, rootEl)
})
