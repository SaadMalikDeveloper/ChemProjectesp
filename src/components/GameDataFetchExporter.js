import { useEffect, useState } from "react";
import axios from "axios";

const GameDataFetchExporter = () => {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chem-project-back-office-es.vercel.app/esp"
        );
        setGameData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { gameData, loading, error };
};

export default GameDataFetchExporter;
