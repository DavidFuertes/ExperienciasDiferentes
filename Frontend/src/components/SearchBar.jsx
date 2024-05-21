import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ experiences }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Función de búsqueda
  const searcher = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // Método de filtrado
  let results = [];
  if (search) {
    results = experiences.filter((experience) => {
      return (
        experience.title.toLowerCase().startsWith(search.toLowerCase()) ||
        (experience.city.toLowerCase().startsWith(search.toLowerCase()) &&
          experience.active !== 0)
      );
    });
  }

  const handleSelect = (id) => {
    navigate(`/experience/${id}`);
    clearInput();
  };

  const clearInput = () => {
    setSearch("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={search}
        placeholder="Busca una experiencia o lugar..."
        onChange={searcher}
        onBlur={clearInput}
      />
      {results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map((result) => (
            <li onMouseDown={() => handleSelect(result.id)} key={result.id}>
              <p>
                {result.title}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {result.city}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
