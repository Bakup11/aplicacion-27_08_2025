import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const allQuestions = [
  {
    questionText: '¿Cuál es el océano más grande del mundo?',
    answerOptions: [
      { answerText: 'Océano Atlántico', isCorrect: false },
      { answerText: 'Océano Índico', isCorrect: false },
      { answerText: 'Océano Pacífico', isCorrect: true },
      { answerText: 'Océano Ártico', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es la capital de Francia?',
    answerOptions: [
      { answerText: 'Londres', isCorrect: false },
      { answerText: 'Berlín', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
      { answerText: 'París', isCorrect: true },
    ],
  },
  {
    questionText: '¿Quién escribió "El Quijote"?',
    answerOptions: [
      { answerText: 'Federico García Lorca', isCorrect: false },
      { answerText: 'Gabriel García Márquez', isCorrect: false },
      { answerText: 'Miguel de Cervantes', isCorrect: true },
      { answerText: 'Pablo Neruda', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuántos planetas hay en el Sistema Solar?',
    answerOptions: [
      { answerText: '7', isCorrect: false },
      { answerText: '8', isCorrect: true },
      { answerText: '9', isCorrect: false },
      { answerText: '10', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es el río más largo del mundo?',
    answerOptions: [
      { answerText: 'Río Amazonas', isCorrect: false },
      { answerText: 'Río Nilo', isCorrect: false },
      { answerText: 'Río Yangtsé', isCorrect: false },
      { answerText: 'Ambos, Amazonas y Nilo (su longitud es debatida)', isCorrect: true },
    ],
  },
  {
    questionText: '¿En qué año se disolvió la Unión Soviética?',
    answerOptions: [
      { answerText: '1989', isCorrect: false },
      { answerText: '1990', isCorrect: false },
      { answerText: '1991', isCorrect: true },
      { answerText: '1992', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es la montaña más alta del mundo?',
    answerOptions: [
      { answerText: 'Monte Kilimanjaro', isCorrect: false },
      { answerText: 'Monte Everest', isCorrect: true },
      { answerText: 'Monte Aconcagua', isCorrect: false },
      { answerText: 'Monte McKinley', isCorrect: false },
    ],
  },
  {
    questionText: '¿Quién pintó la "Mona Lisa"?',
    answerOptions: [
      { answerText: 'Vincent van Gogh', isCorrect: false },
      { answerText: 'Pablo Picasso', isCorrect: false },
      { answerText: 'Leonardo da Vinci', isCorrect: true },
      { answerText: 'Claude Monet', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es el metal más abundante en la corteza terrestre?',
    answerOptions: [
      { answerText: 'Hierro', isCorrect: false },
      { answerText: 'Aluminio', isCorrect: true },
      { answerText: 'Cobre', isCorrect: false },
      { answerText: 'Oro', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuántos huesos tiene el cuerpo humano adulto?',
    answerOptions: [
      { answerText: '206', isCorrect: true },
      { answerText: '200', isCorrect: false },
      { answerText: '210', isCorrect: false },
      { answerText: '208', isCorrect: false },
    ],
  },
  {
    questionText: '¿Qué animal es el mamífero terrestre más grande?',
    answerOptions: [
      { answerText: 'Elefante africano', isCorrect: true },
      { answerText: 'Jirafa', isCorrect: false },
      { answerText: 'Rinoceronte blanco', isCorrect: false },
      { answerText: 'Hipopótamo', isCorrect: false },
    ],
  },
  {
    questionText: '¿En qué año se fundó Google?',
    answerOptions: [
      { answerText: '1996', isCorrect: false },
      { answerText: '1998', isCorrect: true },
      { answerText: '2000', isCorrect: false },
      { answerText: '2004', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es el país más pequeño del mundo?',
    answerOptions: [
      { answerText: 'Mónaco', isCorrect: false },
      { answerText: 'San Marino', isCorrect: false },
      { answerText: 'Vaticano', isCorrect: true },
      { answerText: 'Nauru', isCorrect: false },
    ],
  },
  {
    questionText: '¿Cuál es la capital de Australia?',
    answerOptions: [
      { answerText: 'Sídney', isCorrect: false },
      { answerText: 'Melbourne', isCorrect: false },
      { answerText: 'Canberra', isCorrect: true },
      { answerText: 'Brisbane', isCorrect: false },
    ],
  },
  {
    questionText: '¿Qué gas es el más abundante en la atmósfera terrestre?',
    answerOptions: [
      { answerText: 'Oxígeno', isCorrect: false },
      { answerText: 'Dióxido de carbono', isCorrect: false },
      { answerText: 'Argón', isCorrect: false },
      { answerText: 'Nitrógeno', isCorrect: true },
    ],
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      handleRestartGame();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameOver || !currentQuestion || !gameStarted) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1;
        handleNextQuestion();
        return 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, gameOver, gameStarted]);

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
      setSelectedAnswer(null);
      setIsAnswering(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (availableQuestions.length > 1) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const nextQuestions = [...availableQuestions];
      const nextQuestion = nextQuestions.splice(randomIndex, 1)[0];
      setCurrentQuestion(nextQuestion);
      setAvailableQuestions(nextQuestions);
      setTimer(10);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    setAvailableQuestions(shuffledQuestions.slice(1));
    setCurrentQuestion(shuffledQuestions[0]);
    setScore(0);
    setTimer(10);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsAnswering(false);
  };

  const getAnswerButtonClass = (index) => {
    if (selectedAnswer === null) {
      return 'bg-gray-700 hover:bg-gray-600';
    }
    const isCorrect = currentQuestion.answerOptions[index].isCorrect;

    if (index === selectedAnswer) {
      return isCorrect ? 'bg-green-600' : 'bg-red-600';
    }

    return isCorrect ? 'bg-green-600 opacity-80' : 'bg-red-700 opacity-60';
  };

  const mainClass = "min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white font-sans";
  const containerClass = "w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 text-center flex flex-col";
  const timerClass = `text-xl font-bold mb-4 p-2 rounded-xl border border-gray-600 shadow-inner w-24 mx-auto ${timer <= 3 ? 'bg-red-700 scale-110' : 'bg-gray-700'}`;
  const answerButtonBaseClass = "font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg shadow-md transform hover:scale-105 flex items-center justify-center space-x-2";
  const restartButtonClass = "mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg";
  const startButtonClass = "bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-2xl";

  if (!gameStarted) {
    return (
      <div className={mainClass}>
        <div className={containerClass}>
          <h1 className="text-4xl font-extrabold mb-6">Juego de Trivia</h1>
          <p className="text-xl mb-8 text-gray-400">Pon a prueba tus conocimientos con preguntas de cultura general.</p>
          <button onClick={() => setGameStarted(true)} className={startButtonClass}>
            Empezar juego
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className={mainClass}>
        <div className={containerClass}>
          <p className="text-xl">Cargando juego...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={mainClass}>
      <div className={containerClass}>
        {gameOver ? (
          <div>
            <p className="text-4xl font-extrabold mb-4">
              ¡Has respondido {score} de {allQuestions.length} preguntas correctamente!
            </p>
            <button onClick={handleRestartGame} className={restartButtonClass}>
              Jugar de Nuevo
            </button>
          </div>
        ) : (
          <>
            <div className={timerClass}>{timer}s</div>
            <div className="mb-6">
              <div className="text-lg text-gray-400 mb-2">
                Pregunta {allQuestions.length - availableQuestions.length}/{allQuestions.length}
              </div>
              <div className="text-2xl font-bold mb-6">{currentQuestion.questionText}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                  className={`${answerButtonBaseClass} ${getAnswerButtonClass(index)}`}
                  disabled={isAnswering}
                >
                  {answerOption.answerText}
                  {selectedAnswer !== null && (
                    answerOption.isCorrect ? (
                      <FiCheckCircle className="ml-2 text-white" size={24} />
                    ) : (
                      index === selectedAnswer && <FiXCircle className="ml-2 text-white" size={24} />
                    )
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
