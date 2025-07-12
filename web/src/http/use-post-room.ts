import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PostRoomAPI } from './types/post-room'

export const usePostRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (room: PostRoomAPI) => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
      })
      const data: { id: string } = await response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
}
