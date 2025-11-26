import { useAuth } from '../contexts/authContext'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const { userLoggedIn } = useAuth()

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <h1 className="text-xl font-semibold text-white">
          Welcome {userLoggedIn ? (currentUser?.displayName ? currentUser.displayName : currentUser?.email) : 'Guest'} to Gaon Connect
        </h1>
      </div>
    </>
  )
}

export default Home
