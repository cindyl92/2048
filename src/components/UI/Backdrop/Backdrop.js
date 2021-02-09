import React from 'react';

import './Backdrop.css';

const backdrop = (props) => (
    props.show ? 
        <div className="Backdrop">
            {
                props.reached2048 ? 
                    <div>
                        <p>You Win!</p>
                        <button onClick={props.continueButtonClicked}>Continue</button>
                        <button onClick={props.newGameButtonClicked}>New Game</button>
                    </div> :
                    <div>
                        <p>Game Ended!</p>
                        <button onClick={props.newGameButtonClicked}>New Game</button>
                    </div>
            }
        </div> : null
);

export default backdrop;