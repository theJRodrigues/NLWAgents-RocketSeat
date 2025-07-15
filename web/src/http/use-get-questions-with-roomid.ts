import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionResponse } from './types/get-room-question-response'

export const useGetQuestionsWithRoomID = (roomId: string) => {
  return useQuery({
    queryKey: ['questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )

      const data: GetRoomQuestionResponse = await response.json()
      return data
    },
  })
}
