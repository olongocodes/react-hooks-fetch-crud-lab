import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  // Function to handle question deletion
  const handleDelete = () => {
    onDelete(); // Trigger the onDelete function passed from QuestionList
  };

  // Function to handle question update
  const handleUpdate = () => {
    // Send a PATCH request to your server to update the correctIndex
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: selectedAnswer }),
    })
      .then((response) => response.json())
      .then(() => {
        // Update the list of questions (you can implement this part as needed)
      });
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        >
          {options}
        </select>
        <button onClick={handleUpdate}>Update</button>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
