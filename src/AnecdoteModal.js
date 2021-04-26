import React from 'react';
import './AnecdoteModal.css';
 
function AnecdoteModal() {
  return (
    <div className="group-4">
      <div className="overlap-group rectangleAnecdote">
        <img
          className="img-20210213-wa0006-1"
          src="img-20210213-wa0006-1.png"
        />
        <Group5
          title="ANECDOTE"
          line6="line-6.png"
        />
      </div>
    </div>
  );
}
 
export default AnecdoteModal;
 
function Group5(props) {
  const { title, line6 } = props;
 
  return (
    <div className="group-5">
      <div className="flex-col">
        <div className="flex-row">
          <h1 className="title roboto-black-mercury-40px">{title}</h1>
          <div className="rectangle-2"></div>
        </div>
        <div className="rectangle-"></div>
        <div className="rectangle-"></div>
        <div className="rectangle-"></div>
        <div className="rectangle-"></div>
        <div className="rectangle-"></div>
        <div className="rectangle-"></div>
      </div>
      <img className="line-6" src={line6} />
    </div>
  );
}
