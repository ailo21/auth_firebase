import './App.css';
import Form from "./components/common/Form";
import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import {app} from './firebase-config';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithCustomToken
} from 'firebase/auth'
import {useEffect, useState} from "react";
import Home from "./components/screen/Home";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/screen/Layout";

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState(null);
    let navigate = useNavigate();

    const handleAction = (id) => {
        const authentication = getAuth();
        if (id === 2) {
            //sign up
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .catch((error) => {
                    console.log(error)
                });
        } else if (id === 1) {
            signInWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Please check the Email')
                    }
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Please check the Password')
                    }

                })
        }
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/home')
        }

    }, [])
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // User is signed out
                setCurrentUser(null)
            }
        });

    }, [])

    return (

        <div className="App">
            <>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Layout user={currentUser} />}>
                        <Route
                            path='/home'
                            element={<Home user={currentUser} />}
                        />
                        <Route path='/login' element={
                            <Form
                                title="Login"
                                setEmail={setEmail}
                                setPassword={setPassword}
                                handleAction={() => handleAction(1)}
                            />
                        } />
                        <Route path='/register' element={
                            <Form
                                title="Sign up"
                                setEmail={setEmail}
                                setPassword={setPassword}
                                handleAction={() => handleAction(2)}
                            />
                        } />
                    </Route>

                </Routes>
            </>
        </div>
    );
}

export default App;
