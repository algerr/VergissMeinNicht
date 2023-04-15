// Die benötigten Module und Bibliotheken sowie das Styling (index.css) werden importiert.
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

// Die App-Komponente und damit die gesamte Webseite wird gerendert.
ReactDOM.render(<App />, document.getElementById('root'))
