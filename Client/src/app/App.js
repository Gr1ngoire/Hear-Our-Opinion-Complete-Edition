import React from "react";
import { Routes, Route } from "react-router-dom";
import PetitionsPage from "./pages/petitionsPage";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import HeaderMenu from "./ui/headerMenu";
import PetitionPage from "./pages/petitionPage";
import CreatePetitionPage from "./pages/createPetitionPage";
import { PetitionsProvider } from "./hooks/usePetitions";
import { ToastContainer } from "react-toastify";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthRender from "./components/hoc/AuthRender";

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <Auth0Provider
                domain="dev-60hiqvk9.us.auth0.com"
                clientId="P6u95QK2pdWz4I91xBqhiqHjOuaX1GRH"
                redirectUri={window.location.origin}
                audience="hear-our-opinion-super-secret-identifier"
                scope="openid profile email"
            >
                <HeaderMenu />
                <PetitionsProvider>
                    <Routes>
                        <Route
                            path="/petition/:petitionId"
                            element={
                                <AuthRender>
                                    <PetitionPage />
                                </AuthRender>
                            }
                        />
                        <Route
                            path="/petition/create"
                            element={
                                <AuthRender>
                                    <CreatePetitionPage />
                                </AuthRender>
                            }
                        />
                        <Route
                            path="/petition"
                            element={
                                <AuthRender>
                                    <PetitionsPage />
                                </AuthRender>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <AuthRender>
                                    <ProfilePage />
                                </AuthRender>
                            }
                        />
                        <Route exact path="/" element={<MainPage />} />
                    </Routes>
                </PetitionsProvider>
            </Auth0Provider>
        </div>
    );
}

export default App;
