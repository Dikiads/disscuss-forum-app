import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/slice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then((result) => {
      if (result.error) {
        Swal.fire(
          'Registrasi Gagal',
          result.error.message || 'Harap periksa kembali isian form Anda.',
          'error'
        );
      } else {
        Swal.fire({
          title: 'Berhasil',
          text: 'Akun terdaftar! Silakan login.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/login');
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="bg-gradient-to-br from-blue-800 to-blue-500 px-8 py-8 text-center relative">
        <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10 tracking-tight">
          Buat Akun Baru
        </h2>
        <p className="text-blue-100 text-sm font-medium relative z-10">
          Bergabunglah dengan ribuan developer kreatif lainnya.
        </p>
      </div>

      <div className="p-8">
        <RegisterInput register={handleRegister} />

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Sudah pernah mendaftar?{' '}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
