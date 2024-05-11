import { ListadoExperiencias } from "../components/ListadoExperiencias.jsx";
import { useExperiences } from "../hooks/useExperiences.js";

export const Home = () => {
  const { experiences, loading, error } = useExperiences();

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
    <section className="listSection">
      <h1>Últimas experiencias</h1>
      <ListadoExperiencias experiences={experiences} />
    </section>
  );
};
