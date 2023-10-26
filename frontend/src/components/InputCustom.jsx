import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSmile } from 'react-icons/ai';
import { useSnackbar } from 'notistack';

const InputCustom = () => {
  const [search, setSearch] = useState('');
  const [searchBook, setSearchBook] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = (e, index) => {
    axios
      .post(`http://localhost:5555/books/add/${index}`)
      .then(() => {
        enqueueSnackbar('Book has been added to favorite', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  useEffect(() => {
    search
      ? axios
          .get(`http://localhost:5555/books/search/${search}`)
          .then((response) => {
            setSearchBook(response.data.books);
            console.log(searchBook);
          })
          .catch((error) => {
            console.log(error);
          })
      : axios
          .get(`http://localhost:5555/books`)
          .then((response) => {
            setSearchBook(response.data.data);
            console.log(searchBook);
          })
          .catch((error) => {
            console.log(error);
          });
  }, [search]);
  return (
    <>
      <div className="w-72 ">
        <div className="relative h-10 w-full min-w-[300px] ">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Search
          </label>
        </div>
      </div>
      <div className="border border-blue-gray-700 ">
        {searchBook &&
          searchBook.map((item, index) => {
            return (
              <div
                key={index}
                className="px-10 mx-10 text-center flex justify-start justify-around flex-row gap-20 text-xl rounded-[10px_20px_10px_15px] p-3 bg-blue-400 text-white my-5">
                <h3>{'Title: ' + item.title}</h3>
                <h3>{'Price: ' + item.price + '$'}</h3>
                <h3>
                  <AiOutlineSmile
                    onClick={(e) => handleSaveBook(e, item._id)}
                    className="cursor-pointer text-yellow-400 color text-2xl hover:text-violet-400 active:text-violet-400 focus:outline-none focus:ring focus:ring-violet-300"
                  />
                </h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default InputCustom;
