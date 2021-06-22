import { useState, useContext , useEffect} from 'react'
import { createContext, ReactNode } from 'react'
import { auth, firebase } from '../services/firebase'

const AuthContext = createContext({} as AuthContextType)

type AuthProviderChildren = {
  children: ReactNode;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

function AuthProvider({children}: AuthProviderChildren){
  const [ user, setUser ] = useState<User>()

  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid} = user

        if(!displayName || !photoURL) {
          throw new Error("Missing information from Google Account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  },[])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if(result.user) {
      const { displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL) {
        throw new Error("Missing information from Google Account")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

    }
  }

  return(
    <AuthContext.Provider 
      value={{
        user,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }