import { Button } from "@/components/ui/button"

import MedalhaImg from '../../assets/medalha.svg'
import { PiNotePencilBold } from 'react-icons/pi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DialogCreateTeam } from '../DialogCreateTeam'

export const Teams = () => {
  return (
    <section className="bg-[#1f1e2b] w-full h-[45rem] rounded-2xl">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 py-10 px-7">
        <div className='w-full flex flex-col items-start justify-center gap-3'>
          <h1 className='text-2xl text-neutral-300 font-bold'>Meus Times</h1>
          <div className='w-full flex items-center gap-3'>

            <Dialog>
              <DialogTrigger asChild>
                <Button className='py-5.5 px-4 text-md bg-neutral-500 hover:bg-neutral-600 transition duration-75 ease-in cursor-pointer'>
                  Cadastrar Time
                </Button>
              </DialogTrigger>

              <DialogCreateTeam />
            </Dialog>
          </div>
        </div>

        <div className='w-full h-full flex flex-col items-center gap-4'>
          <div className="w-full h-full flex flex-col items-center gap-2">
            {/* start card teams */}
            <div className="w-full h-24 flex items-center justify-start gap-2 bg-[#5f658a] hover:bg-[#4e5370] transition duration-75 ease-in px-3 py-6 rounded-2xl">
              <span className="w-16 h-15.5 flex items-center justify-center text-2xl text-white font-bold bg-[#787faf] rounded-md">1</span>
              <div className="w-full flex items-center justify-center gap-2">
                <img className='w-14' src={MedalhaImg} alt="" />
                <div className="w-full flex flex-col items-start justify-center gap-1">

                  <div className='w-full flex items-center justify-between'>
                    <h2 className="text-2xl text-neutral-100 font-bold">Name Time</h2>
                    <div className='flex items-center justify-center gap-1'>
                      <PiNotePencilBold size={28} className='text-neutral-200 hover:text-neutral-400 cursor-pointer transition duration-75 ease-in-out' />
                      <RiDeleteBin5Line size={28} className='text-neutral-200 hover:text-red-800 cursor-pointer transition duration-75 ease-in-out' />
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between gap-8">
                    <span className="text-neutral-300 font-semibold">Por dinheiro</span>
                    <span className="text-neutral-300">10/03/2025</span>
                  </div>
                </div>
              </div>

            </div>
            {/* end card teams */}
          </div>


          <div>

          </div>
        </div>
      </div>


    </section>
  )
}

