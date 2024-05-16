import { useEffect, useState } from "react";
import { getAllExperiencesService } from "../services/index.js";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await getAllExperiencesService(filters);
        setExperiences(data.experiences);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, [filters]);

  return { experiences, loading, error, setFilters, setError };
};
