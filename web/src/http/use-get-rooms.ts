import { useQuery } from '@tanstack/react-query'
import type { GetRoomsAPIResponse } from './types/get-rooms-response'

export const useGetRooms = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const rooms: GetRoomsAPIResponse = await response.json()

      return rooms
    },
  })

  return {
    rooms: data,
    isLoading,
    error,
  }
}
