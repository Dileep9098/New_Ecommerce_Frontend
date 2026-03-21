import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
import ScriptLoader from './components/ScriptLoader.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <ScriptLoader />
    <App />
  </Provider>
  </>,
)
