import { ListadoExperiencias } from "../components/ListadoExperiencias.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
import { useForm } from "react-hook-form";
import styles from "./Home.module.css";
import Loading from "../components/Loading.jsx";

export const Home = () => {
  const { experiences, loading, error, filters, setFilters, setError } =
    useExperiences();

  const { handleSubmit, register, reset, setValue, watch } = useForm({
    defaultValues: {
      search: "",
      sortBy: "",
      sortOrder: "",
      type: "",
    },
  });

  const handleSortByClick = (value) => {
    setValue("sortBy", value);
  };

  const handleSortOrderClick = (value) => {
    setValue("sortOrder", value);
  };

  const handleTypeClick = (value) => {
    setValue("type", value);
  };

  const onSubmit = (data) => {
    setFilters(data);
  };

  const handleResetFilters = () => {
    setFilters({});
    setError(false);
    reset();
  };

  const sortBy = watch("sortBy");
  const sortOrder = watch("sortOrder");
  const type = watch("type");
  const search = watch("search");

  if (loading) {
    return (
      <section className="listSection">
        <h1>Últimas experiencias</h1>
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.listSection}>
        <h1 className={styles.h1Main}>Últimas experiencias</h1>
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.pForm} >Filtros de búsqueda:</p>
          <input
            type="text"
            {...register("search")}
            placeholder="Ciudad..."
          ></input>
          <select
            value={type}
            onChange={(e) => handleTypeClick(e.target.value)}
          >
            <option value="" disabled hidden>
              Filtrar por...
            </option>
            <option
              value="Relajado"
              className={type === "Relajado" ? styles.selected : ""}
            >
              Relajado
            </option>
            <option
              value="Medio"
              className={type === "Medio" ? styles.selected : ""}
            >
              Activo
            </option>
            <option
              value="Adrenalina pura"
              className={type === "Adrenalina pura" ? styles.selected : ""}
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
            className={styles.filterButton}
            type="submit"
            disabled={!((sortBy && sortOrder) || type || search)}
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            className={styles.filterButton}
            onClick={handleResetFilters}
            disabled={Object.keys(filters).length === 0}
            >
            Reiniciar filtros
          </button>
        </form>
        <p>Error: {error}</p>
      </section>
    );
  } else
    return (
        <>
      <section className={styles.listSection}>
        <h1>Últimas experiencias</h1>
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
          <p>Filtros de búsqueda:</p>
          <input
            type="text"
            {...register("search")}
            placeholder="Ciudad..."
          ></input>
          <select
            value={type}
            onChange={(e) => handleTypeClick(e.target.value)}
          >
            <option value="" disabled hidden>
              Intensidad...
            </option>
            <option
              value="Relajado"
              className={type === "Relajado" ? styles.selected : ""}
            >
              Relajado
            </option>
            <option
              value="Medio"
              className={type === "Medio" ? styles.selected : ""}
            >
              Medio
            </option>
            <option
              value="Adrenalina pura"
              className={type === "Adrenalina pura" ? styles.selected : ""}
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
            className={styles.filterButton}
            disabled={!((sortBy && sortOrder) || type || search)}
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            className={styles.filterButton}
            onClick={handleResetFilters}
            disabled={Object.keys(filters).length === 0}
          >
            Reiniciar filtros
          </button>
        </form>
      </section>
        <ListadoExperiencias experiences={experiences} />
        </>
    );
};
