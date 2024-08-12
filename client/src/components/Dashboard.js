import React, {useEffect, useState, useRef} from 'react'
import { Table } from './Table'

const Dashboard = () => {
  const [songs, setSongs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const title = useRef(null);
  const [songByTitle, setSongByTitle] = useState([])
  const [showByTitle, setShowByTitle] = useState(false)
  const [showTable, setShowTable] = useState(true)

  useEffect(function() {
      fetch(`/songs?page=${page}&per_page=10`).then(
        (res) => res.json()
      ).then(
        data => {
          setSongs(data.items)
          setTotalPages(data.pages)
        }
      )
    
  }, [page, showTable]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowByTitle(true)
    setShowTable(false)
    fetch(`/searchByTitle?title=${encodeURIComponent(title.current.value)}`).then(
      (res) => res.json()
    ).then(
      data => {
        setSongByTitle(data)
      }
    )
  }
  const handleNextPage = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1)
    }  
  }

  const handleShowButtonClick = (e) => {
    e.preventDefault()
    setShowTable(true)
    setShowByTitle(false)
    setPage(1)
    title.current.value = ''
  }
 
  return (
    <>
      <div className="bg-blue-100 flex justify-center h-15">
        <h1 className="text-3xl font-bold my-5">Vivpro Assignment: Bhabya Sinha</h1>
      </div>
      <div>
        <form className="my-2" onSubmit={handleSearch}>
          <input
            ref={title}
            type="text"
            placeholder="Search By title"
            className="ml-2 p-2 border border-gray-300"
          />
          <button type="submit" className="p-2 bg-blue-300 ml-2">
            Get Song
          </button>
          <button className="p-2 bg-blue-300 ml-6" onClick={handleShowButtonClick}>
            Show all songs
          </button>
        </form>
      </div>
      {showByTitle && songByTitle && (
        <div className="mx-24 mb-16 my-16">
          <Table songsData={songByTitle} />
        </div>
      )}
      {showTable && songs && (
        <div className="mx-24 mb-16 my-16">
          <Table songsData={songs} />
          <div className="flex justify-center items-center mt-1 p-1 bg-white border-t">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 mx-2"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 mx-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;