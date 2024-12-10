import React, { useEffect, useState } from "react";
import axios from "axios";

const SurveyResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiToken = "0FLv7bOz4ZFZWChVWeD7M1Q1Ug5g6aTp7RI8gPIF";
  const surveyId = "SV_bl9XDzvh7fntM3k";
  const datacenterId = "pdx1";

  useEffect(() => {
    // Fetch responses when component mounts
    const fetchSurveyResponses = async () => {
      try {
        const response = await axios.get(
          `https://${datacenterId}.qualtrics.com/API/v3/surveys/${surveyId}/responses`,
          {
            headers: {
              "X-API-TOKEN": apiToken,
            },
          }
        );

        setResponses(response.data.result.responses); // store the responses
        console.log(response);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();
  }, []);

  if (loading) {
    return <div>Loading responses...</div>;
  }

  return (
    <div>
      <h1>Survey Responses</h1>
      <ul>
        {responses.map((response, index) => (
          <p>
            {response.meta && (
              <div>Meta Data: {JSON.stringify(response.meta)}</div>
            )}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default SurveyResponses;
