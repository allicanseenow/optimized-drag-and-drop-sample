import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';

import { DraggableGrid, GameContainer } from './component';

const App = () => {
    return (
        <div>
            <DraggableGrid />
            <GameContainer />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
