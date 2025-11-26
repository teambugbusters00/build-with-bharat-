import { useAuth } from '../contexts/authContext'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const { userLoggedIn } = useAuth()

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <h1 className="text-xl font-semibold text-text">
          {t("homePage.welcome")} {userLoggedIn ? (currentUser?.displayName ? currentUser.displayName : currentUser?.email) : 'Guest'} {t("homePage.msg")}
        </h1>
      </div>
    </>
  )
}

export default Home
