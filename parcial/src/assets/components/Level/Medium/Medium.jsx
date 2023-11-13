import React, { useState, useEffect } from 'react';
import { fetchMediumQuestions } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import '../difficultyStyle.css';

const MediumQuiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedQuestions = localStorage.getItem('mediumQuizQuestions');
        if (storedQuestions) {
          const storedIndex = localStorage.getItem('mediumQuizIndex');
          setQuestions(JSON.parse(storedQuestions));
          setCurrentQuestionIndex(storedIndex ? parseInt(storedIndex, 10) : 0);
        } else {
          const uniqueToken = Date.now().toString();
          const mediumQuestions = await fetchMediumQuestions(uniqueToken);
          setQuestions(mediumQuestions);
          localStorage.setItem('mediumQuizQuestions', JSON.stringify(mediumQuestions));
          localStorage.setItem('mediumQuizIndex', '0');
        }

        const storedAnswers = localStorage.getItem('mediumQuizAnswers');
        if (storedAnswers) {
          setSelectedAnswers(JSON.parse(storedAnswers));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('mediumQuizAnswers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const shuffleAnswers = (currentQuestion) => {
    if (!currentQuestion || !currentQuestion.incorrect_answers || !currentQuestion.correct_answer) {
      return [];
    }
  
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  };
  

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswers[currentQuestionIndex];
        return newAnswers;
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
      calculateResults();
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const returnToLevel = () => {
    navigate('/Level');
  };

  const restartQuiz = async () => {
    try {
      const uniqueToken = Date.now().toString();
      const mediumQuestions = await fetchMediumQuestions(uniqueToken);
      setQuestions(mediumQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers(Array(mediumQuestions.length).fill(null));
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setQuizFinished(false);
      setShowResults(false);
    } catch (error) {
      console.error('Error restarting quiz:', error);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((question, index) => {
      if (question.correct_answer === selectedAnswers[index]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    setCorrectAnswers(correctCount);
    setIncorrectAnswers(incorrectCount);
  };

  return (
    <div className='d-container'>
      {showResults ? (
        <>
          <p>¡Quizz finalizado!</p>
          <p>Respuestas Correctas: {correctAnswers}</p>
          <p>Respuestas Incorrectas: {incorrectAnswers}</p>
        </>
      ) : (
        <>
          <div className='questions-p'>
            <h2>Pregunta {currentQuestionIndex + 1}</h2>
            <p>{questions[currentQuestionIndex]?.question}</p>
            <p>{'Category: ' + questions[currentQuestionIndex]?.category}</p>
            <p>{'Difficulty: '+ questions[currentQuestionIndex]?.difficulty}</p>
            <ul>
              {shuffleAnswers(questions[currentQuestionIndex]).map((answer, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleAnswerSelection(answer)}
                    disabled={selectedAnswers[currentQuestionIndex] !== null}
                    style={{
                      backgroundColor:
                        answer === selectedAnswers[currentQuestionIndex]
                          ? answer === questions[currentQuestionIndex]?.correct_answer
                            ? 'green'
                            : 'red'
                          : '',
                    }}
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
            {selectedAnswers[currentQuestionIndex] !== null && (
              <p>Respuesta Correcta: {questions[currentQuestionIndex]?.correct_answer}</p>
            )}
          </div>
        </>
      )}

      <div className='last-section'>
        {quizFinished && (
          <>
            <button onClick={restartQuiz}>Reiniciar Quizz</button>
            <button onClick={returnToLevel}>Regresar a Level</button>
          </>
        )}

        {!showResults && (
          <>
            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Anterior
            </button>
            <button onClick={nextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar Quizz' : 'Siguiente'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MediumQuiz;
