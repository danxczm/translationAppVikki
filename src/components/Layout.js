import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="px-4 mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-4xl sm:max-w-2xl">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};

export default Layout;

// An <Outlet> should be used in parent route elements to render their child route elements.
// This allows nested UI to show up when child routes are rendered.
// If the parent route matched exactly, it will render a child index route or nothing
// if there is no index route.
