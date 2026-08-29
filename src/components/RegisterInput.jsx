import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-gray-900"
          placeholder="Ketik nama Anda"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-gray-900"
          placeholder="nama@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Buat Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-gray-900"
          placeholder="Minimal 6 karakter"
          required
        />
        <p className="text-xs text-gray-400 mt-2 font-medium ml-1">
          <i className="fa-solid fa-shield-halved mr-1"></i> Data Anda
          dienkripsi dan aman
        </p>
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] focus:ring-4 focus:ring-gray-300"
      >
        Daftarkan Akun
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
