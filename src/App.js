import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'components/Layout';
import HomeTitle from 'components/HomeTitle';
import FlashCardsList from './features/flashCards/FlashCardsList';
import EditFlashCard from 'features/flashCards/EditFlashCard';
import FlashCardsCollectionList from 'features/flashCardsCollection/FlashCardsCollectionList';

const App = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomeTitle />} />

                    <Route path="flashCards">
                        <Route index element={<FlashCardsList />} />
                        <Route path="edit/:flashCardId" element={<EditFlashCard />} />
                        {/* <Route path=":flashCardId" element={<SingleFlashCardPage />} />*/}
                    </Route>
                    <Route path="cardsCollections">
                        <Route index element={<FlashCardsCollectionList />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
