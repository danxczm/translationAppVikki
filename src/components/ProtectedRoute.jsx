import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/authContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    useEffect(() => {
        if (!userLoggedIn) {
            navigate('/');
            return;
        }
    }, [userLoggedIn, navigate]);

    return <Outlet />;
};

export default ProtectedRoute;
