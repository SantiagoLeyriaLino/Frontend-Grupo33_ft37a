'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import logo from '../public/logocommerce.png';
import cart from '../public/cart.png';
import Link from 'next/link';
import Menu from './Menu/Menu';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { searchProducts } from '@/redux/Slice';

export default function NavBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length > 0) {
        dispatch(searchProducts(searchTerm));
        router.push('/search');
      }
    }, 500),
    []
  );

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    debouncedSearch(searchTerm);
  };

  useEffect(() => {
    if (!search) {
      dispatch(searchProducts());
    }
  }, [search, dispatch]);

  return (
    <nav className="flex flex-col justify-between pt-[1rem]  gap-y-[1rem] fixed w-full z-50 bg-white border-b-2 border-black">
      <div className="flex justify-around w-full items-center">
        <Link href={'/'}>
          <Image src={logo} alt="logo-img" width={80} height={80} />
        </Link>
        <input
          className="bg-[#90909050] w-[45%] p-[0.6rem] rounded-[1rem]  pl-[1rem]"
          type="text"
          onChange={handleChange}
          value={search}
        />
        <div className="flex items-center gap-x-[2rem]">
          <Link href={'/login'}>Register/Login</Link>
          <Image src={cart} alt="ico-cart" width={40} height={40} />
        </div>
      </div>
      <Menu />
    </nav>
  );
}