import CreateRoomForm from './create-room-form'
import RecentRoomsList from './recent-rooms-list'

const CreateRoom = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col justify-between gap-5 p-2 md:max-w-5xl md:flex-row md:items-start">
        <CreateRoomForm />
        <RecentRoomsList />
      </div>
    </div>
  )
}

export default CreateRoom
