import { ListadoExperiencias } from "../components/ListadoExperiencias.jsx";
import { useExperiences } from "../hooks/useExperiences.js";

export const Home = () => {
  const { experiences, loading, error } = useExperiences();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <section className="listSection">
      <h1>Últimas experiencias</h1>
      <ListadoExperiencias experiences={experiences} />
    </section>
  );
};
