import { useRef, useCallback } from 'react';

import { PhaserGame } from './game/PhaserGame';

function App ()
{ 
    const phaserRef = useRef();
    const currentScene = useCallback((scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    }, []);

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App
