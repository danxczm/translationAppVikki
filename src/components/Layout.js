import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="xl:max-w-6xl lg:max-w-5xl md:max-w-4xl sm:max-w-2xl mx-auto px-4">
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
