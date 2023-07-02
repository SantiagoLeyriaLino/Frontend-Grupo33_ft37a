import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsRender } from "@/redux/Slice";

export default function Paginate() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filterProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [renderProducts, setRenderProducts] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      var indexOfLastProduct = currentPage * productsPerPage;
      var indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      var currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
      setRenderProducts(currentProducts);
      dispatch(getProductsRender(currentProducts));
    }
  }, [products, currentPage, productsPerPage, dispatch]);

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    const totalPageNumbers = Math.ceil(products.length / productsPerPage);
    const newPageNumbers = Array.from({ length: totalPageNumbers }, (_, index) => index + 1);
    setPageNumbers(newPageNumbers);
    setRenderProducts([]);
    setCurrentPage(1);
  }, [products, productsPerPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center items-center">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`cursor-pointer px-3 py-2 rounded-lg ${
          currentPage === 1 ? 'opacity-0 cursor-default' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Prev
      </button>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <span
              id={`elemento${number}`}
              onClick={() => paginado(number)}
              className={`cursor-pointer px-3 py-2 rounded-lg ${
                number === currentPage ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={goToNextPage}
        disabled={currentPage === pageNumbers.length}
        className={`cursor-pointer px-3 py-2 rounded-lg ${
          currentPage === pageNumbers.length || pageNumbers.length===0 ? 'opacity-0 cursor-default' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </nav>
  );
}