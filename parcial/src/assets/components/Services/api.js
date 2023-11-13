import  axios from 'axios';


export const fetchEasyQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching easy questions:', error);
    }
};

export const fetchMediumQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching medium questions:', error);
    }
};

export const fetchHardQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching hard questions:', error);
    }
};