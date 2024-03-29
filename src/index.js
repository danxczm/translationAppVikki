import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter>
            <ToastContainer />
            <App />
        </HashRouter>
    </Provider>
);
