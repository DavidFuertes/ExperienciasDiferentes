import { useState } from "react";
import { ListadoExperiencias } from "../components/ListadoExperiencias.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
import { useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { SearchBar } from "../components/SearchBar.jsx";

export const Home = () => {
  const [filters, setFilters] = useState({});
  const { experiences, loading, error } = useExperiences();

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
    watch,
  } = useForm();

  const handleSortByClick = (value) => {
    setValue("sortBy", value);
  };

  const handleSortOrderClick = (value) => {
    setValue("sortOrder", value);
  };

  const onSubmit = (data) => {
    setFilters(data);
    reset();
  };

  const sortBy = watch("sortBy");
  const sortOrder = watch("sortOrder");

  if (loading) {
    return (
      <section className="listSection">
        <h1>Últimas experiencias</h1>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="listSection">
        <h1>Últimas experiencias</h1>
        <p>Error: {error}</p>
      </section>
    );
  }
  return (
    <>
      <SearchBar experiences={experiences} />
      <section className="listSection">
        <h1>Últimas experiencias</h1>
        <p>Filtros de búsqueda</p>
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() => handleSortByClick("date")}
            className={sortBy === "date" ? styles.selected : ""}
          >
            Fecha
          </button>
          <button
            type="button"
            onClick={() => handleSortByClick("price")}
            className={sortBy === "price" ? styles.selected : ""}
          >
            Precio
          </button>
          <button
            type="button"
            onClick={() => handleSortByClick("average_rating")}
            className={sortBy === "average_rating" ? styles.selected : ""}
          >
            Valoración
          </button>
          <button
            type="button"
            onClick={() => handleSortOrderClick("asc")}
            className={sortOrder === "asc" ? styles.selected : ""}
          >
            Ascendente
          </button>
          <button
            type="button"
            onClick={() => handleSortOrderClick("desc")}
            className={sortOrder === "desc" ? styles.selected : ""}
          >
            Descendente
          </button>
          <button type="submit">Aplicar filtros</button>
        </form>
        <ListadoExperiencias experiences={experiences} filters={filters} />
      </section>
    </>
  );
};
