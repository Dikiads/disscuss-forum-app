import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread, cancelAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleAddThread = (e) => {
    e.preventDefault();
    addThread({ title, body, category });
  };

  return (
    <form onSubmit={handleAddThread} className="p-8 space-y-7">
      <div>
        <label className="block text-sm font-extrabold text-gray-800 mb-2">
          Judul Diskusi <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-semibold text-gray-900 shadow-sm"
          placeholder="Contoh: Bagaimana cara optimasi React?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-extrabold text-gray-800 mb-2">
          Hashtag Kategori{' '}
          <span className="text-gray-400 font-medium text-xs ml-1">
            (Opsional)
          </span>
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-bold text-gray-900 shadow-sm"
          placeholder="Contoh: reactjs"
        />
      </div>

      <div>
        <label className="block text-sm font-extrabold text-gray-800 mb-2">
          Isi Pesan/Utama <span className="text-red-500">*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y min-h-[200px] leading-relaxed text-gray-800 font-medium shadow-sm"
          placeholder="Tuliskan cerita komplit Anda di sini..."
          required
        />
      </div>

      <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-gray-100 mt-8">
        <button
          type="button"
          onClick={cancelAdd}
          className="px-6 py-3.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
        >
          Batalkan
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <i className="fa-regular fa-paper-plane mr-2"></i> Lempar Diskusi
        </button>
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
};

export default ThreadInput;
