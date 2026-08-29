import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/authUser/slice';

import Navigation from './components/Navigation';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const AddThreadPage = lazy(() => import('./pages/AddThreadPage'));
const LeaderboardsPage = lazy(() => import('./pages/LeaderboardsPage'));

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Navigation authUser={authUser} />

      <div className="md:ml-64 pb-20 md:pb-0 min-h-screen bg-gray-50 border-l border-gray-200">
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center mt-32">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"></div>
              <p className="text-gray-500 text-sm font-medium">Memuat...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />

              {authUser && <Route path="/new" element={<AddThreadPage />} />}
              {authUser && <Route path="/login" element={<Navigate to="/" />} />}
              {authUser && <Route path="/register" element={<Navigate to="/" />} />}

              {!authUser && <Route path="/login" element={<LoginPage />} />}
              {!authUser && <Route path="/register" element={<RegisterPage />} />}
              {!authUser && <Route path="/new" element={<Navigate to="/login" />} />}
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
