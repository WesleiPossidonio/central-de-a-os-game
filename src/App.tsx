import { BrowserRouter } from "react-router-dom"
import { Header } from "./Components"
import { AppProvider } from "./Contexts"
import BgImage from './assets/BG.png'
import { Router } from "./routes/routes"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <main className="w-full h-auto flex flex-col items-center justify-center gap-8 min-h-svh bg-cover bg-center p-8" style={{ backgroundImage: `url(${BgImage})` }}>
          <Header />
          <Router />
        </main>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
