
import { useState } from 'react';

import AuthContext from '././app/hooks/context';

import UserStack from './UserStack';
import AuthStack from './AuthStack';
import Home from './app/screens/Home';
import Details from './app/screens/Details';

export default function App() {
  const [user, setUser] = useState();

  return (
    
    //<Home/>
    //<Details/>
    <AuthContext.Provider value={{user, setUser}}>
      {user ? <UserStack/> : <AuthStack/>}
    </AuthContext.Provider>
 
  ); 
}
 
