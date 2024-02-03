
import Login from './pages/Login'

import 
  {useStore}
from './app/store'
import SearchPage from './pages/Search'
import Home from './pages/Home'

import {
  useUserStore
} from './app/store'

function App() {

  const {
    accessToken
  } = useStore()
  
  return (
    <div>
      {
        !accessToken?
        <Login/> : 
        <Home/>
        
      }
    </div>
  )
}

export default App
