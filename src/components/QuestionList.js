import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Function to handle question deletion
  const handleDelete = (id) => {
    // Send a DELETE request to your server with the question id
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted question from the list
        setQuestions(questions.filter((question) => question.id !== id));
      });
  };

  // Fetch questions when the component loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => handleDelete(question.id)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
