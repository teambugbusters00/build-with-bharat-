import Navbar from '../components/Navbar'
import { useAuth } from '../contexts/authContext'

const Home = () => {

  const { currentUser } = useAuth()
  const { userLoggedIn } = useAuth()

  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Welcome {userLoggedIn ? (currentUser?.displayName ? currentUser.displayName : currentUser?.email) : 'Guest'} to Gaon Connect
        </h1>
      </div>
    </>
  )
}

export default Home
