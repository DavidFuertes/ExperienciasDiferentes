import { ExperienceList } from "../components/ExperienceList.jsx";
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
    <section>
      <h1>Últimas experiencias</h1>
      <ExperienceList experiences={experiences} />
    </section>
  );
};
