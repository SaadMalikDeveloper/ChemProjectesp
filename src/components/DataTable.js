import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]); // Set initial value to an empty array
  const [loading, setLoading] = useState(true); // Loading state to show a loader if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chem-project-back-office-es.vercel.app/esp"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (data.length === 0) {
    return <p>No data available</p>; // Fallback message if there's no data
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const getSecondEntries = (data) => {
    const occurrences = {};
    return data.filter((item) => {
      const id = item.participant_id;
      occurrences[id] = (occurrences[id] || 0) + 1;
      return occurrences[id] === 2;
    });
  };

  const filteredData = getSecondEntries(data);
  console.log(filteredData);

  return (
    <>
      <div className="user__data_table">
        <div className="header_game_row">
          <header>
            <h1 className="logo">LOGO</h1>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
          </header>
        </div>
        <div className="data-table body__start">
          <h2>User Data</h2>
          <table>
            <thead>
              <tr>
                <th>Participant ID</th>
                <th>User IP</th>
                <th>Time</th>
                <th>Fail Attempts</th>
                <th className="combination__content_col">
                  First Phase Combinations Sets
                </th>
                <th className="combination__content_col">
                  Second Phase Combinations Sets
                </th>
                <th className="glass__content_col">
                  Based on what you saw, what does the liquid in Glass 1 do
                  alone or interaction with the other liquids?*
                </th>
                <th className="glass__content_col">
                  Based on what you saw, what does the liquid in Glass 2 do
                  alone or interaction with the other liquids?*
                </th>
                <th className="glass__content_col">
                  Based on what you saw, what does the liquid in Glass 3 do
                  alone or interaction with the other liquids?*
                </th>
                <th className="glass__content_col">
                  Based on what you saw, what does the liquid in Glass 4 do
                  alone or interaction with the other liquids?*
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.participant_id || "N/A"}</td>
                  <td>{item.userIP || "N/A"}</td>
                  <td>{item.createdAt || "N/A"}</td>
                  <td>{item.attemptsgame?.failAttempts || "N/A"}</td>
                  <td>
                    <div className="combination__phaseF_box">
                      {item.flaskCombinationsPhaseF
                        ? item.flaskCombinationsPhaseF.map(
                            (combination, index) => (
                              <span key={index}>
                                <em>[G{combination.join(", G")}]</em>
                              </span>
                            )
                          )
                        : "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="combination__phaseF_box">
                      {item.flaskCombinationsPhaseT
                        ? item.flaskCombinationsPhaseT.map(
                            (combination, index) => (
                              <span key={index}>
                                <em>[G{combination.join(", G")}]</em>
                              </span>
                            )
                          )
                        : "N/A"}
                    </div>
                  </td>
                  <td>{item.answergame?.glass1 || "N/A"}</td>
                  <td>{item.answergame?.glass2 || "N/A"}</td>
                  <td>{item.answergame?.glass3 || "N/A"}</td>
                  <td>{item.answergame?.glass4 || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer>
          <div className="left__footer_col"></div>
          <div className="right__footer_col">
            <button className="next__btn_footer" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DataTable;
