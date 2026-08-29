import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/slice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password })).then((result) => {
      if (result.error) {
        Swal.fire(
          'Login Gagal',
          result.error.message ||
            'Email atau password yang Anda masukkan salah.',
          'error'
        );
      } else {
        Swal.fire({
          title: 'Berhasil',
          text: 'Berhasil masuk ke akun!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/');
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="bg-blue-600 px-8 py-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10"></div>

        <div className="mx-auto bg-white/20 w-16 h-16 flex items-center justify-center rounded-2xl mb-4 relative z-10 backdrop-blur-sm shadow-inner">
          <i className="fa-solid fa-right-to-bracket text-3xl text-white"></i>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10 tracking-tight">
          Selamat Datang!
        </h2>
        <p className="text-blue-100 text-sm font-medium relative z-10">
          Masuk untuk melanjutkan pengalaman diskusi hebat Anda.
        </p>
      </div>

      <div className="p-8">
        <LoginInput login={handleLogin} />

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Daftar secara gratis
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
