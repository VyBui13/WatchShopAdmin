import App from './App'
import Header from './Header'
import './styles/dashboard.css'

function Dashboard() {
    return (
        <>
            <div id="dashboard">
                <div className="dashboard__left">
                    <Header />
                </div>

                <div className="dashboard__right">
                    <App />
                </div>
            </div>
        </>
    )
}

export default Dashboard