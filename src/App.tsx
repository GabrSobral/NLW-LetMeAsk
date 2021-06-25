import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

import './styles/global.scss'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>

          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
