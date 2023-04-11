import { useContext, createContext, useState, useEffect } from 'react'
import { fetchMe, fetchOut } from '../Api'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  //const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        if (localStorage.getItem('accessToken')) {
          const me = await fetchMe()
          setLoggedIn(true)
          console.log('me', me)
          setUser(me)
        }
        //setLoading(false)
      } catch (e) {
        //setLoading(false)
      }
    })()
  }, [setUser])

  const login = async (data) => {
    setLoggedIn(true)
    setUser(data.user)

    localStorage.setItem('accessToken', data.data.accessToken)
    localStorage.setItem('refreshToken', data.data.refreshToken)

    const me = await fetchMe()
    setUser(me)
  }

  const logout = async () => {
    setLoggedIn(false)
    setUser(null)

    await fetchOut()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  const values = {
    loggedIn,
    user,
    login,
    logout,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }
