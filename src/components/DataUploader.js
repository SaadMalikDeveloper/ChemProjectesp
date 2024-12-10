import React, { useState } from "react";
import Papa from "papaparse";

const DataUploader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null); // Store the file

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setUploadedFile(file); // Store the uploaded file
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvData = e.target.result;
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map((item) => {
              // Transform key from ResponseId to participant_id
              const { Qualtrics, ...rest } = item;
              return { participant_test: Qualtrics, ...rest };
            });

            console.log("Transformed JSON:", parsedData);
            setJsonData(parsedData); // Save transformed data
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleAjaxCall = async () => {
    if (!jsonData || !uploadedFile) {
      alert("No data or file available to send.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", uploadedFile);

      const response = await fetch(
        "https://chem-project-back-office-es.vercel.app/gameQuartricMergeESP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData), // Use parsed JSON data
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data. Check the console for details.");
    }
  };

  return (
    <div className="overall__body_file_uploader">
      <h2>File Uploader</h2>
      <div className="file__uploader_header">
        {jsonData ? (
          <div className="button_row">
            <button onClick={handleAjaxCall}>Make AJAX Call</button>
            <button onClick={toggleCollapse}>
              {isCollapsed ? "Show JSON" : "Hide JSON"}
            </button>
          </div>
        ) : (
          <div className="file_row">
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </div>
        )}
      </div>

      {jsonData && (
        <div className="body_render">
          {!isCollapsed && (
            <pre
              style={{
                backgroundColor: "#f4f4f4",
                padding: "10px",
                borderRadius: "5px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default DataUploader;
