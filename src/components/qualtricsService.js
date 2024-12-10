import React, { useEffect, useState } from "react";

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
        const response = await fetch(
          `https://${datacenterId}.qualtrics.com/API/v3/surveys/${surveyId}/responses`,
          {
            method: "GET",
            headers: {
              "X-API-TOKEN": apiToken,
            },
          }
        );

        const data = await response.json();
        setResponses(data.result.responses); // store the responses
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
          <li key={index}>
            {/* Display the response details here */}
            Response ID: {response.responseId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyResponses;
