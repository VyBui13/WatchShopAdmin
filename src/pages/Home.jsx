import { useAuthorizations } from '../components/AuthorizationContext'
import '../styles/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const { user } = useAuthorizations();
    return (
        <>
            <div className="home">
                <div className="home__left">
                    <div className="home__welcome__icon">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </div>

                </div>

                <div className="home__right">
                    <div className="home__text">
                        <h1>Welcome {user.userName}!</h1>
                        <h5>Remember, every small step brings you closer to success!</h5>
                        <p>Believe in yourself—great things await today!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home