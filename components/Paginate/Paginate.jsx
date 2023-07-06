import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsRender } from "@/redux/Slice";

export default function Paginate() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filterProducts);
  const prev = '<';
  const next = '>'
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

  const getVisiblePageNumbers = () => {
    const visiblePageNumbers = [];
    if (currentPage <= 7) {
      if(pageNumbers.length>=7){
      for (let i = 1; i <= 7; i++) {
        visiblePageNumbers.push(i);
      }}else{
        for (let i = 1; i <=pageNumbers.length ; i++) {
          visiblePageNumbers.push(i);
        }
      }
    } else if (currentPage >= pageNumbers.length - 3) {
      for (let i = pageNumbers.length - 7; i < pageNumbers.length + 1 ; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        visiblePageNumbers.push(i);
      }
    }
    return visiblePageNumbers;
  };

  return (
    <nav className="flex justify-center items-center">
  <button
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    className={`cursor-pointer px-2 py-1 rounded-lg text-sm ${
      currentPage === 1 ? 'opacity-0 cursor-default' : 'bg-gray-200 hover:bg-gray-300'
    }`}
  >
    {prev}
  </button>
  <ul className="flex items-center space-x-2">
    {currentPage > 7 && (
      <li>
        <span
          className={`cursor-pointer px-2 py-1 rounded-lg text-sm ${
            1 === currentPage ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => paginado(1)}
        >
          1
        </span>
      </li>
    )}
    {currentPage > 7 && (
      <li>
        <span className="cursor-pointer px-2 py-1 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">...</span>
      </li>
    )}
    {getVisiblePageNumbers().map((pageNumber) => (
      <li key={pageNumber}>
        <span
          className={`cursor-pointer px-2 py-1 rounded-lg text-sm ${
            pageNumber === currentPage ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => paginado(pageNumber)}
        >
          {pageNumber}
        </span>
      </li>
    ))}
    {pageNumbers.length - currentPage > 3 && (
      <li>
        <span className="cursor-pointer px-2 py-1 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">...</span>
      </li>
    )}
    {pageNumbers.length - currentPage > 3 && (
      <li>
        <span
          className={`cursor-pointer px-2 py-1 rounded-lg text-sm ${
            pageNumbers.length === currentPage ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => paginado(pageNumbers.length)}
        >
          {pageNumbers.length}
        </span>
      </li>
    )}
  </ul>
  <button
    onClick={goToNextPage}
    disabled={currentPage === pageNumbers.length}
    className={`cursor-pointer px-2 py-1 rounded-lg text-sm  ${
      currentPage === pageNumbers.length || pageNumbers.length===0 ? 'opacity-0 cursor-default' : 'bg-gray-200 hover:bg-gray-300'
    }`}
  >
    {next}
  </button>
</nav>
  );
}