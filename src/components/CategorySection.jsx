import { FaTv, FaGem, FaMale, FaFemale } from 'react-icons/fa'; // Icons for the categories
import { useNavigate } from 'react-router-dom';

const CategorySection = ({ categories = [], selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'electronics':
        return <FaTv />;
      case 'jewelery':
        return <FaGem />;
      case "men's clothing":
        return <FaMale />;
      case "women's clothing":
        return <FaFemale />;
      default:
        return null;
    }
  };

  if (!categories.length) {
    return <div>No categories available</div>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md text-white flex items-center space-x-2 ${
            selectedCategory === ""
              ? "bg-blue-600"
              : "bg-gray-400"
          }`}
          onClick={() => handleCategoryClick('')}
        >
          <span>All Products</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-white flex items-center space-x-2 ${
              selectedCategory === category
                ? "bg-blue-600"
                : "bg-gray-400"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {getCategoryIcon(category)}
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
