import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const HomeTitle = lazy(() => import('./components/HomeTitle'));
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
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomeTitle />} />

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

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default App;
