import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ListImages from "./components/ListImages";

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const askAPI = async () => {
      if (search === "") return;

      const imagesPerPage = 30;
      const key = "18784545-182a56eb38d893b377c6afaef";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;

      const answer = await fetch(url);
      const result = await answer.json();

      setImages(result.hits);

      // clc total amount of pages

      const calcTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calcTotalPages);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    askAPI();
  }, [search, currentPage]);

  const pageBefore = () => {
    const newCurrentPage = currentPage - 1;

    if (newCurrentPage === 0) return;

    setCurrentPage(newCurrentPage);
  };

  const pageNext = () => {
    const newCurrentPage = currentPage + 1;

    if (newCurrentPage > totalPages) return;

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search Images Engine</p>
        <Form setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <ListImages images={images} />
        {currentPage === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={pageBefore}
          >
            &laquo; Before
          </button>
        )}

        {currentPage === totalPages ? null : (
          <button type="button" className="btn btn-info" onClick={pageNext}>
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
