import App from './App'
import Header from './Header'
import SubHeader from './SubHeader'
import './styles/dashboard.css'

function Dashboard() {
    return (
        <>
            <div id="dashboard">
                <div className="dashboard__left">
                    <Header />
                </div>

                <div className="dashboard__right">
                    <SubHeader />
                    <div className="dashboard__data">
                        <App />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard