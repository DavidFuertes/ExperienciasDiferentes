import { useState } from "react";
import { ListadoExperiencias } from "../components/ListadoExperiencias.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
import { useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { SearchBar } from "../components/SearchBar.jsx";

export const Home = () => {
  const [filters, setFilters] = useState({});
  const { experiences, loading, error } = useExperiences();

  const { handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      sortBy: "",
      sortOrder: "",
      filterType: "",
    },
  });

  const handleSortByClick = (value) => {
    setValue("sortBy", value);
  };

  const handleSortOrderClick = (value) => {
    setValue("sortOrder", value);
  };

  const handleFilterTypeClick = (value) => {
    setValue("filterType", value);
  };

  const onSubmit = (data) => {
    setFilters(data);
  };

  const handleResetFilters = () => {
    setFilters({});
    reset();
  };

  const sortBy = watch("sortBy");
  const sortOrder = watch("sortOrder");
  const filterType = watch("filterType");

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
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <p>Filtrar por...</p>
          <select
            value={filterType}
            onChange={(e) => handleFilterTypeClick(e.target.value)}
          >
            <option value="" disabled hidden>
              Filtrar por...
            </option>
            <option
              value="Relajado"
              className={filterType === "Relajado" ? styles.selected : ""}
            >
              Relajado
            </option>
            <option
              value="Medio"
              className={filterType === "Medio" ? styles.selected : ""}
            >
              Activo
            </option>
            <option
              value="Adrenalina pura"
              className={
                filterType === "Adrenalina pura" ? styles.selected : ""
              }
            >
              Adrenalina
            </option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => handleSortByClick(e.target.value)}
          >
            <option value="" disabled hidden>
              Ordenar por...
            </option>
            <option
              value="date"
              className={sortBy === "date" ? styles.selected : ""}
            >
              Fecha
            </option>
            <option
              value="price"
              className={sortBy === "price" ? styles.selected : ""}
            >
              Precio
            </option>
            <option
              value="average_rating"
              className={sortBy === "average_rating" ? styles.selected : ""}
            >
              Valoración
            </option>
            <option
              value="total_places"
              className={sortBy === "total_places" ? styles.selected : ""}
            >
              Número de plazas
            </option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => handleSortOrderClick(e.target.value)}
          >
            <option value="" disabled hidden>
              Orden...
            </option>
            <option
              value="asc"
              className={sortOrder === "asc" ? styles.selected : ""}
            >
              Ascendente
            </option>
            <option
              value="desc"
              className={sortOrder === "desc" ? styles.selected : ""}
            >
              Descendente
            </option>
          </select>
          <button
            type="submit"
            disabled={!((sortBy && sortOrder) || filterType)}
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={Object.keys(filters).length === 0}
          >
            Reiniciar filtros
          </button>
        </form>
        <ListadoExperiencias experiences={experiences} filters={filters} />
      </section>
    </>
  );
};
