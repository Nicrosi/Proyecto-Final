import React from "react";
import { useSelector } from "react-redux";
import arrowLeft from "../../img/arrow-left-filter.png";
import arrowRight from "../../img/arrow-right-filter.png";
import "./Navigator.css";

export default function Navigator({ currentPage, setCurrentPage }) {
  const users = useSelector((state) => state.rootReducer.filteredUsers);

  const cantPages = Math.ceil(users.length / 11),
    arrPages = arrPageCreator(currentPage, cantPages);

  const handlePage = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="conteiner">
      <ul>
        {cantPages > 0 && currentPage > 0 ? (
          <li key={"prev"}>
            <button
              className={"prev"}
              onClick={() => handlePage(currentPage - 1)}
            >
              <img src={arrowLeft} alt="" />
            </button>
          </li>
        ) : null}
        {arrPages.map((page, i) => (
          <li key={i}>
            {page !== "..." ? (
              <button
                onClick={() => handlePage(page)}
                className={currentPage === page ? "activeButton" : ""}
              >
                {page}
              </button>
            ) : (
              <button className="ellipsis">{page}</button>
            )}
          </li>
        ))}
        {cantPages > 0 && currentPage < cantPages - 1 ? (
          <li key={"next"}>
            <button
              className={"next"}
              onClick={() => handlePage(currentPage + 1)}
            >
              <img src={arrowRight} alt="" />
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function arrPageCreator(currentPage, cantPages) {
  const arr = [],
    lastPage = cantPages - 1;
  for (let i = 0; i < cantPages; i++) {
    if (i === 0) {
      arr.push(i);
      if (currentPage > 3 && cantPages > 5) arr.push("...");
    } else if (i === lastPage) {
      if (currentPage <= lastPage - 4 && cantPages > 5) arr.push("...");
      arr.push(i);
    } else if (
      (i >= 1 && i <= 3 && currentPage <= 3) ||
      (i <= lastPage - 1 && i >= lastPage - 3 && currentPage >= lastPage - 3)
    ) {
      arr.push(i);
    } else {
      if (i === currentPage - 1 || i === currentPage) arr.push(i);
      else if (i === currentPage + 1) {
        arr.push(i);
      }
    }
  }
  return arr;
}
