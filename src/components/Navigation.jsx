import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/slice';
import Swal from 'sweetalert2';

function Navigation({ authUser }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar sesi?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e293b',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Keluar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncUnsetAuthUser());
      }
    });
  };

  const navItems = [
    { name: 'Beranda', path: '/', icon: 'fa-house' },
    { name: 'Leaderboard', path: '/leaderboards', icon: 'fa-trophy' },
  ];

  return (
    <>
      {/* Desktop Sidebar: Elegant Mac-like Glass/Clean UI */}
      <nav className="hidden md:flex flex-col w-64 bg-white/70 backdrop-blur-md border-r border-gray-100 h-screen fixed left-0 top-0 pt-8 px-5 shrink-0 z-40">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <i className="fa-solid fa-comments text-white text-lg"></i>
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Forum<span className="text-blue-600">App</span>
          </span>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const activeLinkClass = isActive
              ? 'bg-gray-900 text-white font-bold shadow-md shadow-gray-900/20'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-semibold';

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${activeLinkClass}`}
              >
                <i
                  className={`fa-solid ${item.icon} w-5 text-center text-lg`}
                ></i>
                {item.name}
              </Link>
            );
          })}
        </div>

        {authUser ? (
          <div className="border-t border-gray-100 pb-8 pt-6 space-y-4">
            <Link
              to="/new"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white  hover:bg-gray-200 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <i className="fa-solid fa-plus"></i> Diskusi Baru
            </Link>
            <div
              className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-200 transition-colors"
              onClick={handleLogout}
            >
              <img
                src={authUser.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {authUser.name}
                </p>
                <p className="text-xs font-semibold text-red-500 hover:text-red-700">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-100 pb-8 pt-6 space-y-3">
            <Link
              to="/login"
              className="flex items-center justify-center w-full py-3 text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-bold rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-gray-100"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center w-full py-3 bg-gray-600  hover:bg-black text-white font-bold rounded-xl shadow-lg shadow-gray-900/20 transition-all transform hover:-translate-y-0.5"
            >
              Buat Akun
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Bar: Floating Pill Style */}
      <nav className="md:hidden fixed bottom-5 left-4 right-4 bg-gray-100 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2 z-50 flex justify-around items-center border border-gray-800">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
              <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
        {authUser ? (
          <div className="flex gap-1 items-center">
            <Link
              to="/new"
              className="px-3 py-2 text-blue-400 hover:text-blue-300 flex flex-col items-center border-r border-gray-700 pr-4"
            >
              <i className="fa-solid fa-circle-plus text-lg mb-1"></i>
              <span className="text-[10px] font-bold">Buat</span>
            </Link>
            <button
              onClick={handleLogout}
              className="pl-3 pr-2 py-2 flex flex-col items-center group"
            >
              <img
                src={authUser.avatar}
                alt="avatar"
                className="w-6 h-6 rounded-full border border-gray-700 mb-1 group-hover:border-red-500 transition-colors"
              />
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-400">
                Keluar
              </span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors"
          >
            <span className="text-xs font-bold">Masuk Akses</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        )}
      </nav>
    </>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string.isRequired,
  }),
};

export default Navigation;
