import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/na-category'
import './components/na-service'
import './components/na-mechanical'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})