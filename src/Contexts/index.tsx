import { ReactNode } from 'react'

import { UserContextProvider } from './UserContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}
