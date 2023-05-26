import { useState } from 'react';
import MainRoute from './components/MainRoute';
import './css/App.css';
import { UserContext } from './context/Context';
import { encryptStorage1 } from './utility/Storage';

function App() {

  let User = encryptStorage1.getItem('userData')
  let token = encryptStorage1.getItem('token')
  const [currentUser, setCurrentUser] = useState(User)
  const [currentToken, setCurrentToken] = useState(token)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, currentToken, setCurrentToken }}>
      <MainRoute />
    </UserContext.Provider>
  );
}

export default App;
