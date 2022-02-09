import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../contexts/SocketProvider';
import { loadQuestions, loadSettings } from '../../actions';


const WaitingRoomJoin = () => {

  const history = useHistory(); 
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('init-game', (diff, qnum, quiz) => {
      dispatch(loadQuestions(quiz));
      console.log(diff, qnum);
      dispatch(loadSettings(diff, qnum));
      history.push('/game');
    });
  }, [socket]);
  
  return (
    <div>
        <h2> Waiting for Admin to start the game </h2>
        <a href='/menu'className='btn-nav'>{'<< '}menu </a> 
        {/* <a onClick={handleNext} className='btn-nav'>start {' >>'} </a>  */}

    </div>);
};

export default WaitingRoomJoin;