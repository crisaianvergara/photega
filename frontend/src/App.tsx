import { Routes, Route } from 'react-router'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import CreateAccount from './routes/CreateAccount'
import { useAppDispatch } from './app/hook'
import { useEffect } from 'react'
import { fetchCurrentUser } from './features/auth/AuthThunk'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])

    return (
        <>
            <Header />
            <main className="mx-auto max-w-7xl px-2 py-3 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<CreateAccount />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
