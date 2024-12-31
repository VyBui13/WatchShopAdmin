import App from './App'
import Header from './Header'
import SubHeader from './SubHeader'
import './styles/dashboard.css'
import { useEffect, useState } from 'react'
import { useAuthorizations } from './components/AuthorizationContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setUser } = useAuthorizations();
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data');
            try {
                const resUser = await fetch('http://localhost:5000/api/user/auth', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },
                });
                console.log(resUser);


                const dataUser = await resUser.json();
                console.log(dataUser);
                if (dataUser.status !== 'success') {
                    setIsAuthenticated(false);
                    navigate('/login');
                    return;
                }

                setUser(dataUser.user);
                setIsAuthenticated(true);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                navigate('/login');
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div id="dashboard">
                {isAuthenticated &&
                    <>
                        <div className="dashboard__left">
                            <Header />
                        </div>

                        <div className="dashboard__right">
                            <SubHeader />
                            <div className="dashboard__data">
                                <App />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Dashboard