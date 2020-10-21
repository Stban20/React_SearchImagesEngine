import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Form = ({ setSearch }) => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState(false);

  const searchImages = (e) => {
    e.preventDefault();

    // validate
    if (term === "") {
      setError(true);
      return;
    }
    setError(false);

    setSearch(term);
  };
  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search an image"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-success btn-block"
            value="Search"
          />
        </div>
      </div>

      {error ? <Error message="Add any Term" /> : null}
    </form>
  );
};

Form.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Form;
