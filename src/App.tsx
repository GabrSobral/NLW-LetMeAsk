import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

import './styles/global.scss'

import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
