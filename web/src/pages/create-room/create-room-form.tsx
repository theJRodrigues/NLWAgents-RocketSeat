import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { usePostRoom } from '@/http/use-post-room'

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
})

type formData = z.infer<typeof formSchema>

const CreateRoomForm = () => {
  const form = useForm<formData>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(formSchema),
  })

  const { mutateAsync, isPending } = usePostRoom()

  const onSubmit = async ({ name, description }: formData) => {
    await mutateAsync({ name, description })
    form.reset()
  }
  return (
    <Form {...form}>
      <form
        className="w-full space-y-6 rounded-lg border bg-zinc-900 p-6 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <legend>Crie sua sala de perguntas aqui!</legend>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da sala" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <textarea
                  className="resize-y rounded-md border bg-accent p-2 outline-0 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder="Descrição da sala"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full cursor-pointer"
          disabled={isPending}
          type="submit"
        >
          Criar sala
        </Button>
      </form>
    </Form>
  )
}

export default CreateRoomForm
