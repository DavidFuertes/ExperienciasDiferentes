import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <input type="text" value={search} onChange={searcher} />
      {results.map((result) => {
        return (
          <div
            onClick={() => navigate(`/experience/${result.id}`)}
            key={result.id}
          >
            {result.title}
          </div>
        );
      })}
    </div>
  );
};
