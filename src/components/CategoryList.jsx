import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ categories, activeCategory, setActiveCategory }) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === '' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setActiveCategory('')}
            >
                <i className="fas fa-list mr-2"></i>Semua Kategori
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
                >
                    #{cat}
                </button>
            ))}
        </div>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeCategory: PropTypes.string.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
};

export default React.memo(CategoryList);
