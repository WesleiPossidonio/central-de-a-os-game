import { UserContext } from '@/Contexts/UserContext'
import { useContext } from 'react'


export const useUser = () => {
  const context = useContext(UserContext)
  return context
}
