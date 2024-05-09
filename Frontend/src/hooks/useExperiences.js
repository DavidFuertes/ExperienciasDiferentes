import { useEffect, useState, useContext } from "react";
import { getAllExperiencesService } from "../services/index.js";
import { UserContext } from "../context/UserContext.jsx";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const loadExperiences = async (token) => {
      try {
        setLoading(true);
        const data = await getAllExperiencesService(token);
        setExperiences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences(token);
  }, [token]);

  return { experiences, loading, error };
};
