import { deleteCookie } from 'cookies-next'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { COOKIE_KEY } from './deps'

import { User } from './types'

interface AuthContextType {
  user?: User
  loading: boolean
  error?: any
  // eslint-disable-next-line no-unused-vars
  login: (password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [user, setUser] = useState<User | undefined>()
  const [error, setError] = useState<boolean | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true)
  useEffect(() => {
    if (error) setError(null)
  }, [error])

  useEffect(() => {
    !user && fetch('/api/auth/user')
      .then((res) => res.json())
      .then((user: User) => setUser(user))
      // eslint-disable-next-line no-unused-vars
      .catch((_error: Error) => { })
      .finally(() => setLoadingInitial(false))
  }, [user])

  function logout() {
    deleteCookie(COOKIE_KEY)
    setUser(undefined)
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login: async (password: string) => {
        try {
          setLoading(true)
          const res = await fetch('/api/auth/password', {
            body: JSON.stringify({ password }),
            method: 'POST',
          })
          const user = await res.json()
          setUser(user)
          setLoading(false)
        } catch (error) {
          setError(true)
        }
        setLoading(false)
      },
      logout,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
