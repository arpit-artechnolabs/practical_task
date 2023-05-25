import { useState } from 'react';
import MainRoute from './components/MainRoute';
import './css/App.css';
import { UserContext } from './context/Context';
import { encryptStorage1 } from './utility/Storage';

function App() {

 let currentUser= encryptStorage1.getItem('userData')
 let token=encryptStorage1.getItem('token')
  const [userName,setUserName]=useState(currentUser)
  const [currentToken,setCurrentToken]=useState(token)
  // console.log(currentToken,'currentToken');
  return (
    <UserContext.Provider value={{userName,setUserName,currentToken,setCurrentToken}}>
     <MainRoute/>
    </UserContext.Provider>
  );
}

export default App;
