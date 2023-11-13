import "./Level.css";
import { useNavigate } from 'react-router-dom';

const Level = () => {
    const navigate = useNavigate(); 

    return (
       <div className="d-container">
         <h1>Choose your level</h1>
         <button className="easy" onClick={() => navigate('/Easy')} >Level: Easy</button>
         <button className="medium" onClick={() => navigate('/Medium')}  >Level: Medium</button>
         <button className="hard" onClick={() => navigate('/Hard')}  >Level: Hard</button>
         <button className="back" onClick={() => navigate('/')} >Go Back</button>
       </div>
    );

};

export default Level;
