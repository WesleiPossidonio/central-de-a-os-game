import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/useUser"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { BaseSyntheticEvent, FormEvent, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DialogUpdatePerson } from "../DialogUpdatePerson"

const createPersonSchema = zod.object({
  vendedor: zod.string().min(3, 'Digite um nome Valido!'),
  total_vendas: zod.number().min(1, 'Digite um valor Valido!'),
  urlImage: zod.string().url('Digite uma url Valida!')
})

export type createFormInputs = zod.infer<typeof createPersonSchema>

export const DialogCreatePerson = () => {
  const [stateSearch, setStateSearch] = useState('')

  const { handleCreatePerson, ListPerson } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createFormInputs>({
    resolver: zodResolver(createPersonSchema),
  })

  const handleSubmitPerson = (data: createFormInputs, event?: BaseSyntheticEvent) => {
    event?.preventDefault()
    const dataPerson = {
      ...data,
      id_vendedor: ListPerson.length + 1,
      posicao: ListPerson.length + 1,
    }
    handleCreatePerson(dataPerson)
    reset()
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('teamName') as string;
    setStateSearch(name);
  }

  const filterList = ListPerson.filter(list => list.vendedor === stateSearch)

  return (
    <section className="w-full flex items-center justify-center  gap-6 text-white">

      <form className="w-1/2 flex flex-col items-center justify-center gap-4 p-10 bg-[#1f1e2b] border-neutral-600 border-1 rounded-lg" onSubmit={handleSubmit(handleSubmitPerson)}>
        <label className="w-full" htmlFor="name">
          Nome do Colaborador
          <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Nome" id="name" {...register('vendedor')} />
        </label>
        <label className="w-full" htmlFor="name">
          Adicionar Vendas
          <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Valor da Ultima Venda" id="Vendas" {...register('total_vendas')} />
        </label>
        <p className="text-white">{errors?.total_vendas?.message}</p>
        <label className="w-full" htmlFor="name">
          Adicionar Url da Imagem
          <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Adicionarurl de uma foto" id="imagem" {...register('urlImage')} />
        </label>

        <Button type="submit" className='py-5.5 px-4 self-start text-md bg-neutral-500 hover:bg-neutral-600 transition duration-75 ease-in cursor-pointer'>
          Cadastrar Time
        </Button>
      </form>


      <div className="w-1/2 flex flex-col items-center justify-center gap-4 p-10 bg-[#1f1e2b] border-neutral-600 border-1 rounded-lg">
        <form className='w-full self-start grid grid-cols-3 gap-3' action="" onSubmit={(event) => handleSearch(event)}>
          <Input name="teamName" className='py-5 col-span-2 text-white' placeholder='Nome do Time... ' />
          <Button className='py-5.5 px-4 text-md bg-[#5f658a] hover:bg-[#4e5370] cursor-pointer transition duration-75 ease-in'>
            Buscar
          </Button>
        </form>

        <div className="w-full flex flex-column items-center justify-center gap-4 p-6">
          {
            filterList.map(list => {
              return (
                <Dialog>
                  <DialogTrigger asChild key={list.id_vendedor} className="w-full min-h-[5rem] px-4 py-5 xl:py-8 flex items-center justify-start gap-6 rounded-2xl bg-[#5f658a] shadow-lg ">
                    <p className="text-white font-semibold text-xl">Name: {list.vendedor}</p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogUpdatePerson personId={list.id_vendedor !== undefined ? list.id_vendedor : 2} />
                  </DialogContent>
                </Dialog>
              )
            })
          }
        </div>
      </div>

    </section >
  )
}
