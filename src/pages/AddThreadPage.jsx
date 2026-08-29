import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/slice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import ThreadInput from '../components/ThreadInput';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category })).then((result) => {
      if (result.error) {
        Swal.fire(
          'Gagal Membuat Diskusi',
          result.error.message || 'Mohon lengkapi isian Anda.',
          'error'
        );
      } else {
        Swal.fire({
          title: 'Diskusi Mengudara!',
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto mt-4"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-8 relative">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 shadow-inner">
            <i className="fa-solid fa-pen-nib"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Mulai Diskusi Baru
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-2 line-clamp-2">
            Sampaikan ide yang mengilhami, keluh kesah kode, atau solusi brilian
            Anda ke publik secara elegan.
          </p>
        </div>

        <ThreadInput
          addThread={handleAddThread}
          cancelAdd={() => navigate('/')}
        />
      </div>
    </motion.div>
  );
}

export default AddThreadPage;
