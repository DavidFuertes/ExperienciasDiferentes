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
        experience.title.toLowerCase().startsWith(search.toLowerCase()) ||
        (experience.city.toLowerCase().startsWith(search.toLowerCase()) &&
          experience.active !== 0)
      );
    });
  }

  const clearInput = () => {
    setSearch("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={searcher}
      />
      {results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map((result, index) => (
            <li
              onClick={() => {
                navigate(`/experience/${result.id}`);
                clearInput();
              }}
              key={result.id}
              style={{ top: `calc(2rem * ${index + 1})` }}
            >
              <p>{result.title}</p>
              <p>{result.city}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
