import React, {useEffect, useState, useRef} from 'react'
import { Table } from './Table'
import { CSVLink } from 'react-csv'
import ScatterPlot from './ScatterPlot';

const Dashboard = () => {
  const [songs, setSongs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [allSongs, setAllSongs] = useState([])
  const title = useRef(null);
  const [songByTitle, setSongByTitle] = useState([])
  const [showByTitle, setShowByTitle] = useState(false)
  const [showTable, setShowTable] = useState(true)
  const [showPlots, setShowPlots] = useState(false)
  const csvLinkRef = useRef(); 
  const [plotData, setPlotData] = useState([])


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

  useEffect(function() {
    fetch('/songs')
      .then((res) => res.json())
      .then((data) => {
        setPlotData(data); 
      });
  }, []);

  useEffect(() => {
    if (allSongs.length > 0) { 
      csvLinkRef.current.link.click(); 
    }
  }, [allSongs]);


  const handleSearch = (e) => {
    e.preventDefault();
    setShowByTitle(true)
    setShowTable(false)
    setShowPlots(false)
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
    setShowPlots(false)
    setPage(1)
    title.current.value = ''
  }
  const handleDownload = () => {
    fetch('/songs')
      .then((res) => res.json())
      .then((data) => {
        setAllSongs(data); 
      });
  };

  const handlePlot = (e) => {
    e.preventDefault();
    setShowPlots(true)
    setShowByTitle(false)
    setShowTable(false)
  };

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
          <button className="p-2 bg-blue-300 ml-6" onClick={handlePlot}>
            Show Plot
          </button>
        </form>
      </div>
      {showPlots && allSongs && (
        <div className='my-2'>
          <h1 className='text-xl bold ml-16'> Danceability Scatter Plot</h1>
          <ScatterPlot chartdata={plotData}/>
        </div>

      )}

      {showByTitle && songByTitle && (
        <div className="mx-24 mb-16 my-16">
          <Table songsData={songByTitle} songsDataSetter={setSongByTitle}/>
        </div>
      )}
      {showTable && songs && (
        <div className="mx-24 mb-16 my-16">
          <Table songsData={songs}  songsDataSetter={setSongs}/>
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
            <button onClick={handleDownload} className="px-3 py-1 bg-blue-500 text-white rounded">
              Export CSV
            </button>
            <CSVLink
              data={allSongs}
              filename="playlist.csv"
              className="hidden" 
              ref={csvLinkRef} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;