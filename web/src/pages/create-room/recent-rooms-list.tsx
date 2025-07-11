import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetRooms } from '@/http/use-get-rooms'

const RecenteRoomsList = () => {
  const { rooms, isLoading } = useGetRooms()

  const relativeDate = (date: string) => {
    const result = formatDistanceToNow(date, { locale: ptBR, addSuffix: false })
    return result
  }
  return (
    <Card className="max-w-2xl bg-zinc-900">
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas mais recentes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <strong>Carregando...</strong>
        ) : (
          rooms?.map((room) => (
            <Link
              className="flex w-full items-center justify-between gap-4 rounded-lg border px-7 py-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex flex-col gap-2">
                <strong>{room.name}</strong>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {relativeDate(room.createdAt)}
                  </Badge>
                  <Badge variant="secondary">{`${room.questionsCount} pergunta(s)`}</Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar <ArrowRight className="size-3" />
              </span>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default RecenteRoomsList
