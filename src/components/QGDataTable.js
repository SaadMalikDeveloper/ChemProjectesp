import React, { useState, useEffect } from "react";
import { unparse } from "papaparse";

const QGDataTable = () => {
  const [mergedData, setMergedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response1 = await fetch(
          "https://chem-project-back-office-es.vercel.app/esp"
        );
        if (!response1.ok)
          throw new Error(`Error fetching data1: ${response1.status}`);
        const data1 = await response1.json();

        const response2 = await fetch(
          "https://chem-project-back-office-es.vercel.app/gameQuartricMergeESP"
        );
        if (!response2.ok)
          throw new Error(`Error fetching data2: ${response2.status}`);
        const data2 = await response2.json();

        setMergedData(mergeByParticipantId(data1, data2));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mergeByParticipantId = (data1, data2) => {
    console.log(data1, "<<<<<<<<<<<<<<<<<<<");
    console.log(data2, ">>>>>>>>>>>>>>>>");
    const map = {};
    data1.forEach((item) => {
      map[item.participant_id] = { ...item };
    });
    data2.forEach((item) => {
      const participantId = item.ResponseId;
      if (participantId) {
        map[participantId] = { ...map[participantId], ...item };
      }
    });
    console.log(Object.values(map));
    return Object.values(map);
  };

  const flattenObject = (obj, parentKey = "", result = {}) => {
    for (let key in obj) {
      const propName = parentKey ? `${parentKey}_${key}` : key;
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, result);
      } else {
        result[propName] = Array.isArray(obj[key])
          ? JSON.stringify(obj[key])
          : obj[key];
      }
    }
    return result;
  };

  const prepareCSVData = (data) => {
    return data.map((item) => flattenObject(item));
  };

  const downloadCSV = () => {
    const flattenedData = prepareCSVData(mergedData);
    const csv = unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    link.click();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Merged Participant Data</h1>
      <button onClick={downloadCSV}>Download CSV</button>
      <table className="overall_data_style_table">
        <thead>
          <tr>
            <th>#</th>
            <th>Participant ID</th>
            <th className="date_th">Date</th>
            <th>User IP</th>
            <th>Survey ID</th>
            <th>Language</th>
            <th className="question_th">
              America would be better off with a strong President who did not
              have to bother with the Congress.
            </th>
            <th className="question_th">
              The courts should not stand in the way of a President who is
              acting on behalf of the country.
            </th>
            <th className="question_th">
              Because of all the fake news and biased reporting, the President
              needs to control the press to protect the people.
            </th>
            <th className="question_th">
              Sometimes a good leader must violate bad laws in order to better
              serve the interests of the people.
            </th>
            <th className="question_th">
              Our political system is not working! We need new institutions and
              laws that give our leaders the power to make the changes our
              country needs.
            </th>
            <th className="question_th">
              When we have a strong, good leader who understands what the people
              want, it is important to support the leader’s decisions even if
              you sometimes don’t agree.
            </th>
            <th className="question_th">
              When making laws or policies, the will of the majority of
              Americans is more important than the rights of a minority.
            </th>
            <th className="question_th">
              We worry too much about everyone's 'rights.' It is often necessary
              to set aside some legal rights to do what is best for the country.
            </th>
            <th className="question_th">
              Leaders who understand what America needs are just wasting their
              time trying to convince people who see things differently.
            </th>
            <th className="question_th">
              It is important for politicians to debate political issues even
              when it does not lead to agreement.
            </th>
            <th className="question_th">
              When people disagree about important political issues, talking to
              one another will not accomplish anything.
            </th>
            <th className="question_th">
              In the most important political debates, it is clear that one side
              is morally right and the other side is not.
            </th>
            <th className="question_th">
              In politics, tolerance of different moral and political views is
              really just selling out one’s own principles.
            </th>
            <th className="question_th">
              The 2024 Presidential election will be a battle between people who
              know what is good and right for America and those people who are
              deeply wrong.
            </th>
            <th className="question_th">
              The outcome of the 2024 Presidential election will be very
              important for America's future. If it becomes necessary, the use
              of violence is justified to to make sure the best candidate wins.
            </th>
            <th className="question_th">
              Below is a list of American politicians. How similar or different
              are their values to your values? - Donald Trump
            </th>
            <th className="question_th">
              Below is a list of American politicians. How similar or different
              are their values to your values? - Kamala Harris
            </th>
            <th className="question_th">
              Who are you going to vote for President? (Of if you voted already,
              who did you vote for?)
            </th>
            <th className="question_th">
              Although we are different than one another in some ways, most
              Americans share the same basic values.
            </th>
            <th className="question_th">
              Wall Street rich people have very different values than most
              Americans
            </th>
            <th className="question_th">
              Wall Street rich people are just interested in themselves, not the
              American people.
            </th>
            <th className="question_th">
              The Ivy League educated cultural elite have very different values
              than most Americans.
            </th>
            <th className="question_th">
              The Ivy League educated cultural elite are just interested in
              themselves, not the American people.
            </th>
            <th className="question_th">
              Jews have too much political power. This is a problem because they
              tend to put their own interests ahead of the interests of the
              American people.
            </th>
            <th className="question_th">
              In general, a country is better off when all its citizens share a
              common cultural or ethnic background
            </th>
            <th className="question_th">
              A country if better off when all its citizens have the same
              political opinions.
            </th>
            <th className="question_th">
              A country is better off when all its citizens share the same
              religion.
            </th>
            <th className="question_th">
              A country is better off when all its citizens are of the same
              race.
            </th>
            <th className="question_th">
              A good citizen should embrace the values and beliefs held by most
              Americans.
            </th>
            <th className="question_th">
              Some immigration is okay, but now we are letting too many
              immigrants into the US.
            </th>
            <th className="question_th">
              It’s really a matter of some people not trying hard enough; if
              black people would only try harder they could be just as well off
              as white people.
            </th>
            <th className="question_th">
              White males have excluded and exploited minorities for too long.
              They should be held accountable for the harm they have caused
            </th>
            <th className="question_th">
              The rich have taken advantage of everyone else. Their wealth and
              power should be taken away.
            </th>
            <th className="question_th">
              Zach is taller than Matt and Richard is shorter than Zach. Which
              of the following statements would be most accurate?
            </th>
            <th className="question_th">
              If the day after tomorrow is two days before Thursday, then what
              day is it today?
            </th>
            <th className="question_th">
              In the following series of letters, what letter comes next? K N P
              S U _
            </th>
            <th className="question_th">
              In the following series of letters, what letter comes next? I J L
              O S _
            </th>
            <th className="question_th">
              To complete the matrix above, which box should be added?
            </th>
            <th className="question_th">
              To correctly complete the matrix above, which box should be added?
            </th>
            <th className="question_th">
              The right-wing leaders of the Republican Party only care about
              gaining power, not about the American people.
            </th>
            <th className="question_th">
              The leaders of the Republican Party are immoral and a danger to
              America.
            </th>
            <th className="question_th">
              The left-wing leaders of the Democratic Party only care about
              gaining power, not about the American people
            </th>
            <th className="question_th">
              The leaders of the Democratic Party are immoral and a danger to
              America.
            </th>
            <th className="question_th">
              Fox News and other right-wing conservative media should be stopped
              from spreading hateful opinions and fake news.
            </th>
            <th className="question_th">
              CNN and other left-wing liberal news outlets should be stopped
              from spreading hateful opinions and fake news.
            </th>
            <th className="question_th">
              It's more important to protect America's cultural values than to
              allow free speech for left-wing liberals
            </th>
            <th className="question_th">
              Reducing inequality in America is more important than protecting
              the property rights of the very rich.
            </th>
            <th className="question_th">What is your age?</th>
            <th className="question_th">How much schooling have you had?</th>
            <th className="question_th">
              What was your total household income before taxes during the past
              12 months?
            </th>
            <th className="question_th">What is your gender?</th>
            <th className="question_th">
              How important is your gender to your sense of who you are?
            </th>
            <th className="question_th">What is your race?</th>
            <th className="question_th">
              How important is your race to your sense of who you are?
            </th>
            <th className="question_th">
              How would you describe your political ideology?
            </th>
            <th className="question_th">
              How important is your political ideology to your sense of who you
              are?
            </th>
            <th className="question_th">
              Which political party do you identify with most?
            </th>
            <th className="question_th">
              How important is your political party to your sense of who you
              are?
            </th>
            <th className="question_th">How religious are you?</th>
            <th className="question_th">
              How important is your religion to your sense of who you are?
            </th>
            <th>Fail Attempts</th>
            <th>Combination First Phase</th>
            <th>Combination Second Phase</th>
            <th>
              Based on what you saw, what does the liquid in Glass 1 do alone or
              interaction with the other liquids?*
            </th>
            <th>
              Based on what you saw, what does the liquid in Glass 2 do alone or
              interaction with the other liquids?*
            </th>
            <th>
              Based on what you saw, what does the liquid in Glass 3 do alone or
              interaction with the other liquids?*
            </th>
            <th>
              Based on what you saw, what does the liquid in Glass 4 do alone or
              interaction with the other liquids?*
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mergedData)
            .sort(([, a], [, b]) => {
              const dateA = new Date(a.EndDate || 0).getTime();
              const dateB = new Date(b.EndDate || 0).getTime();
              return dateB - dateA;
            })
            .map(([key, item], index) => (
              <tr key={index} className={item.participant_id || "null"}>
                <td>{index + 1}</td>
                <td>{item.participant_id || "N/A"}</td>
                <td>
                  {item.EndDate
                    ? new Date(item.EndDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </td>
                <td>{item.IPAddress || "N/A"}</td>
                <td>{item.SV_id || "N/A"}</td>
                <td>{item.UserLanguage || "N/A"}</td>
                <td>{item.Q2 || "N/A"}</td>
                <td>{item.Q3 || "N/A"}</td>
                <td>{item.Q4 || "N/A"}</td>
                <td>{item.Q5 || "N/A"}</td>
                <td>{item.Q6 || "N/A"}</td>
                <td>{item.Q7 || "N/A"}</td>
                <td>{item.Q8 || "N/A"}</td>
                <td>{item.Q9 || "N/A"}</td>
                <td>{item.Q10 || "N/A"}</td>
                <td>{item.Q11 || "N/A"}</td>
                <td>{item.Q12 || "N/A"}</td>
                <td>{item.Q13 || "N/A"}</td>
                <td>{item.Q14 || "N/A"}</td>
                <td>{item.Q15 || "N/A"}</td>
                <td>{item.Q16 || "N/A"}</td>
                <td>{item.Q17_1 || "N/A"}</td>
                <td>{item.Q17_2 || "N/A"}</td>
                <td>{item.Q76 || "N/A"}</td>
                <td>{item.Q2_1 || "N/A"}</td>
                <td>{item.Q3_1 || "N/A"}</td>
                <td>{item.Q4_1 || "N/A"}</td>
                <td>{item.Q5_1 || "N/A"}</td>
                <td>{item.Q6_1 || "N/A"}</td>
                <td>{item.Q7_1 || "N/A"}</td>
                <td>{item.Q8_1 || "N/A"}</td>
                <td>{item.Q9_1 || "N/A"}</td>
                <td>{item.Q10_1 || "N/A"}</td>
                <td>{item.Q11_1 || "N/A"}</td>
                <td>{item.Q12_1 || "N/A"}</td>
                <td>{item.Q13_1 || "N/A"}</td>
                <td>{item.Q14_1 || "N/A"}</td>
                <td>{item.Q15_1 || "N/A"}</td>
                <td>{item.Q16_1 || "N/A"}</td>
                <td>{item.Q2_2 || "N/A"}</td>
                <td>{item.Q3_2 || "N/A"}</td>
                <td>{item.Q4_2 || "N/A"}</td>
                <td>{item.Q5_2 || "N/A"}</td>
                <td>{item.Q7_2 || "N/A"}</td>
                <td>{item.Q9_2 || "N/A"}</td>
                <td>{item.Q2_3 || "N/A"}</td>
                <td>{item.Q3_3 || "N/A"}</td>
                <td>{item.Q4_3 || "N/A"}</td>
                <td>{item.Q5_3 || "N/A"}</td>
                <td>{item.Q6_2 || "N/A"}</td>
                <td>{item.Q7_3 || "N/A"}</td>
                <td>{item.Q8_2 || "N/A"}</td>
                <td>{item.Q9_3 || "N/A"}</td>
                <td>{item.Q2_4 || "N/A"}</td>
                <td>{item.Q3_4 || "N/A"}</td>
                <td>{item.Q4_4 || "N/A"}</td>
                <td>{item.Q5_4 || "N/A"}</td>
                <td>{item.Q6_3 || "N/A"}</td>
                <td>{item.Q7_4 || "N/A"}</td>
                <td>{item.Q8_3 || "N/A"}</td>
                <td>{item.Q9_4 || "N/A"}</td>
                <td>{item.Q10_2 || "N/A"}</td>
                <td>{item.Q11_2 || "N/A"}</td>
                <td>{item.Q12_2 || "N/A"}</td>
                <td>{item.Q13_2 || "N/A"}</td>
                <td>{item.Q14_2 || "N/A"}</td>
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
  );
};

export default QGDataTable;
