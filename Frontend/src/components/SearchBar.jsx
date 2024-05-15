import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
export const SearchBar = ({ experiences }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  //función de búsqueda
  const searcher = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //método de filtrado
  let results = [];
  if (!search) {
    results;
  } else {
    results = experiences.filter((experience) => {
      return (
        experience.title.toLowerCase().startsWith(search.toLowerCase()) &&
        experience.active !== 0
      );
    });
  }

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={searcher}
      />
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li
              className={styles.searchResults}
              onClick={() => navigate(`/experience/${result.id}`)}
              key={result.id}
              style={{ top: `calc(1.6rem * ${index + 1})` }}
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
