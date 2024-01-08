import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto my-3 p-2">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

// An <Outlet> should be used in parent route elements to render their child route elements.
// This allows nested UI to show up when child routes are rendered.
// If the parent route matched exactly, it will render a child index route or nothing
// if there is no index route.
