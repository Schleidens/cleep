import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./authContext/context";

import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
    const { user } = useAuth();
    
        if (!user) {
           return(
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Navigate to="/signup" replace />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </BrowserRouter>
            </>
           )
        } else {
            return(
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </BrowserRouter>
            </>
            )
        }

}

export default App;