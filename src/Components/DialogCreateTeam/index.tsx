import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/useUser"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

export const DialogCreateTeam = () => {

  const [buttonState, setButtonState] = useState('Pontuação')
  const { addMusic, selectedMusic, audio, setAudio } = useUser()

  useEffect(() => {
    if (selectedMusic) {
      // Se houver um áudio tocando, pause e reinicie
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }

      // Criar novo áudio e tocar
      const newAudio = new Audio(`/music/${selectedMusic}`)
      newAudio.play().catch((error) => console.error("Erro ao tocar áudio:", error))
      setAudio(newAudio)
    }
  }, [audio, selectedMusic, setAudio]) // Reage apenas a mudanças em `selectedMusic`

  return (
    <DialogContent className="min-w-[80%] h-[80vh] flex items-center justify-center bg-[#1f1e2b] text-white border-1 border-neutral-600">
      {/* <DialogHeader>
        <h1 className="text-xl font-bold">Cadastrar Time</h1>
      </DialogHeader> */}
      <div className="w-full h-[85%] flex items-start justify-center gap-6">
        <form className="w-2/4 flex flex-col items-center justify-center gap-4">
          <div className="w-full">
            <label className="w-full" htmlFor="name">
              Nome do Time
              <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Nome" id="name" />
            </label>

            <label className="w-full" htmlFor="selected">Tipo de Pontuação
              <select className="w-full mt-1 p-2 text-neutral-950 border border-neutral-200 bg-neutral-300 rounded-md">
                <option value="Unidade">Unidade</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </label>
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-2 mt-4">
            <h2 className="text-2xl font-bold">Sons do Sistema</h2>
            <label htmlFor="musicSelect" className="w-full flex flex-col gap-1 text-md">Escolha uma música:
              <select
                id="musicSelect"
                value={selectedMusic}
                onChange={(e) => addMusic(e.target.value)}
                className="p-2 border border-neutral-200 rounded-md"
              >
                <option className="text-white" value="" disabled>Sons do Sistema</option>
                <option className="text-neutral-950" value="music1.flac">Som 1</option>
                <option className="text-neutral-950" value="music2.wav">Som 2</option>
                <option className="text-neutral-950" value="music3.mp3">Som 3</option>
                <option className="text-neutral-950" value="music4.wav">Som 4</option>
                <option className="text-neutral-950" value="music5.wav">Som 5</option>
              </select>
            </label>
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-3">
            <div className="flex flex-col items-start justify-center gap-1">
              <h3 className="text-2xl font-bold">Tipo de Ordenação</h3>
              <p className="font-semibold">Define como a lista se organiza</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button className="p-6 hover:bg-neutral-700" onClick={() => setButtonState('Pontuação')}>Por Pontuação</Button>
              <Button className="p-6 hover:bg-neutral-700" onClick={() => setButtonState('Porcentage')}>Por Porcentagem</Button>
            </div>
          </div>
        </form>

        <div className="w-2/4 h-full bg-[#343247] flex flex-col items-center justify-start p-6 rounded-md">
          <form className="w-full flex items-center justify-start gap-2" action="">
            <Input className="w-3/5 mt-1 px-2 py-4 text-md" placeholder="Digite o Nome do Colaborador..." id="search" />
            <Button className="w-1/5">
              <Search />
            </Button>
          </form>
          <p>heloooo</p>
        </div>
      </div>
      <DialogFooter></DialogFooter>
    </DialogContent>
  )
}
