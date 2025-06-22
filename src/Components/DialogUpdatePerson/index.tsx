import { Button } from "@/components/ui/button"
import { DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/useUser"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { BaseSyntheticEvent } from "react"

interface DialogProps {
  personId: number
}

const createPersonSchema = zod.object({
  vendedor: zod.string().min(3, 'Digite um nome Valido!'),
  total_vendas: zod.string().min(1, 'Digite um valor Valido!'),
})

export type createFormInputs = zod.infer<typeof createPersonSchema>

export const DialogUpdatePerson = (personId: DialogProps) => {
  const { handleUpdatePerson, ListPerson } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createFormInputs>({
    resolver: zodResolver(createPersonSchema),
  })


  const personData = ListPerson.find(person => person.id_vendedor === personId.personId)

  const handleSubmitPerson = (data: createFormInputs, event?: BaseSyntheticEvent) => {
    event?.preventDefault()

    if (personData && personData.id_vendedor) {
      const { vendedor, total_vendas } = data

      const numbers = Number(total_vendas) + Number(personData.total_vendas)

      const newData = {
        posicao: personData.posicao,
        id_vendedor: personData.id_vendedor,
        vendedor,
        total_vendas: numbers,
        urlImage: personData.urlImage
      }
      handleUpdatePerson(newData)

    }

    reset()
  }

  return (
    <DialogContent className="min-w-[40%] h-[45vh] flex items-center justify-center bg-[#1f1e2b] text-white border-1 border-neutral-600">
      {/* <DialogHeader>
        <h1 className="text-xl font-bold">Cadastrar Time</h1>
      </DialogHeader> */}
      <div className="w-full h-[85%] flex items-start justify-center gap-6">
        <form className="w-full flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit(handleSubmitPerson)}>
          <label className="w-full" htmlFor="name">
            Nome do Colaborador
            <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Nome" id="name"  {...register('vendedor')} defaultValue={personData?.vendedor} disabled />
          </label>
          <label className="w-full" htmlFor="name">
            Adicionar Vendas
            <Input className="w-full mt-1 px-2 py-4 text-md" placeholder="Valor da Ultima Venda" id="Vendas" {...register('total_vendas')} />
          </label>
          <p className="text-white">{errors?.total_vendas?.message}</p>

          <Button type="submit" className='py-5.5 px-4 self-start text-md bg-neutral-500 hover:bg-neutral-600 transition duration-75 ease-in cursor-pointer'>
            Cadastrar Time
          </Button>
        </form>

      </div>
    </DialogContent >
  )
}
