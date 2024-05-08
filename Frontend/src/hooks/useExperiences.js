import { useEffect, useState } from "react";
import { getAllExperiencesService } from "../services/index.js";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await getAllExperiencesService();
        setExperiences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  return { experiences, loading, error };
};
