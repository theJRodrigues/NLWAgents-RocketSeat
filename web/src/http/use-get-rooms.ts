import { useQuery } from '@tanstack/react-query'
import type { GetRoomsAPIResponse } from './types/get-rooms-response'

export const useGetRooms = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      if (!response.ok) {
        throw new Error('Failed to fetch rooms')
      }
      const rooms: GetRoomsAPIResponse = await response.json()
      return rooms
    },
  })

  return {
    rooms: data,
    isLoading,
    isError,
  }
}
