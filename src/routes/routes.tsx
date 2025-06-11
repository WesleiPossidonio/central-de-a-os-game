import { Hero } from '@/Components'
import { DialogCreatePerson } from '@/Components/DialogCreatePerson'
import { Routes, Route } from 'react-router-dom'


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={< Hero />} />
      <Route path="/criar-usuario" element={< DialogCreatePerson />} />
    </Routes>
  )
}
