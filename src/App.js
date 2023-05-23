import { useState } from 'react';
import MainRoute from './components/MainRoute';
import './css/App.css';
import { UserContext } from './context/Context';
import { encryptStorage1 } from './utility/Storage';

function App() {

//  let user= encryptStorage1.getItem('userData')
//  console.log(user);
  console.log();
  const [userName,setUserName]=useState('')
  console.log(userName);
  return (
    <UserContext.Provider value={{userName,setUserName}}>
     <MainRoute/>
    </UserContext.Provider>
  );
}

export default App;
