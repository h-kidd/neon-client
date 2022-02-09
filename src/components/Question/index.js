import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recordAnswer, saveScore } from '../../actions';
import './style.css';

const getShuffled = arr => {
    if (arr.length === 1) {return arr};
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...getShuffled(arr.filter((_, i) => i != rand))];
};

function decode(s) {
    var el = document.createElement("div");
    el.innerHTML = s;
    return el.innerText || el.textContent;
}

const Question = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const numQ = useSelector(state => state.numQ);
  const index = useSelector(state => state.index);
  const set = useSelector(state => state.questions[index]);
  const score = useSelector(state => state.score);
  const player = useSelector(state => state.player);
  const question = set.question;
  const cAnswer = set.correct_answer;
  const answers = getShuffled([
        ...set.incorrect_answers,
        set.correct_answer,
    ]);
  
  const handleAnswerSelect = (answer) => {
    console.log(answer);
    const curScore = (answer === cAnswer)? 1: 0;
    console.log(curScore);
    dispatch(recordAnswer(curScore));
    if (index === numQ-1) {
        console.log(score+curScore);  
        dispatch(saveScore(score+curScore, player));
        history.push('/results');
    }
  }

  return (
    <div>
        <h2> Question {index+1} / {numQ}</h2>
            <h3> {decode(question)} </h3>
            {
                answers.map(a => (
                <button key={a} onClick={() => handleAnswerSelect(a)}>
                    {decode(a)}
                </button>
                ))
            } 
        <h3> {score} </h3> 
    </div>);
};

export default Question;
