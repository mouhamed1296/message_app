import ChatRoom from './components/ChatRoom'
import './App.css'
import { Provider } from 'react-redux'
import store from './services/store'

function App() {

  return (
    <Provider store={store}>
      <ChatRoom />
    </Provider>
  )
}

export default App
