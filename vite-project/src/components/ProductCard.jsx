import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();
  const [showMore, setShowMore] = useState(false);
  const descriptionLimit = 100; // Puedes ajustar este límite según tus necesidades

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-indigo-200 max-w-md w-full p-10 rounded-md my-4">
      <header className="flex justify-between">
        <h1 className="text-1xl font-bold">{product.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              deleteProduct(product._id);
            }}
          >
            Delete
          </button>
          <Link
            to={`/products/${product._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>
      <p className="text-slate-600">${product.price}</p>
      <div className={`text-slate-950 ${showMore ? 'h-auto' : 'h-16'} overflow-hidden`}>
        {product.description}
      </div>
      {product.description.length > descriptionLimit && (
        <button
          className="text-blue-400 font-bold hover:text-gray-500 hover:underline focus:outline-none"
          onClick={toggleShowMore}
        >
          {showMore ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}

export default ProductCard;