import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/auth/AuthLogin';
import Register from './components/auth/AuthRegister';
import { AuthProvider } from './app/authContext';
import ProtectedRoute from './components/ProtectedRoute';
const Home = lazy(() => import('./components/Home'));
const FlashCards = lazy(() => import('./features/flashCards/FlashCards'));
const FlashCardEditForm = lazy(() => import('./features/flashCards/FlashCardEditForm'));
const FlashCardsCollectionList = lazy(() =>
    import('./features/flashCardsCollection/FlashCardsCollectionList')
);
const FlashCardDescriptionCards = lazy(() =>
    import('./features/flashCards/FlashCardDescriptionCards')
);

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="flashCards">
                            <Route index element={<FlashCards />} />
                            <Route path="edit/:flashCardId" element={<FlashCardEditForm />} />
                        </Route>

                        <Route path="descriptionCards">
                            <Route index element={<FlashCardDescriptionCards />} />
                        </Route>

                        <Route path="cardsCollections">
                            <Route index element={<FlashCardsCollectionList />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
