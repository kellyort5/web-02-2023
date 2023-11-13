import './homeStyle.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='main-container'>
        <h1>Welcome to the Trivia App!</h1>
        <button className="button-quiz" onClick={() => navigate('/level')}>Start Quiz</button>
        <button className="button-estadistics">Estadistics</button>
        </div>
    );
    };

export default Home;