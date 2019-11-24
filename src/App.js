import React, { useState, useEffect } from 'react'
import './App.scss'

import cacerolazo from '../assets/sounds/cacerolazo.mp3'
import cara from '../assets/sounds/cara.mp3'

function App() {
  const publicPath = './assets/sounds/'
  const [audioSrc, setAudioSrc] = useState(cara)

  // Default loop attribute is false.
  let loop = false

  // When audioSrc changes, we send that event to our state machine.
  useEffect(() => actionStateManager('sound-changed'))

  function _handleAction(actionName) {
    actionStateManager(actionName)
  }

  function actionStateManager (actionName) {
    const audioElement = document.getElementById('audio')

    switch (actionName) {
      case 'play':
        // Play audio.
        audioElement.play()
        return
      case 'pause':
        // Pause audio.
        audioElement.pause()
        return
      case 'repeat':
        // Repeaat means reload audio and play again.
        audioElement.load()
        audioElement.play()
        return
      case 'loop':
        // Loop switcher.
        loop = !loop
        audioElement.loop = !!loop
        return
      case 'sound-changed':
        // Sound changes means pause, reload source, and play.
        audioElement.pause()
        audioElement.load()
        audioElement.play()
        return
      default:
        // By default, pause audio.
        audioElement.pause()
        break
    }
  }

  return (
    <div className="App">
      {audioSrc}
      <audio id="audio">
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
      <div className="content-container">
        <div className="content-actions">
          <button className="action" onClick={() => _handleAction('play')}>PLAY</button>
          <button className="action" onClick={() => _handleAction('pause')}>PAUSAR</button>
          <button className="action" onClick={() => _handleAction('repeat')}>REPETIR</button>
          <button className="action" onClick={() => _handleAction('loop')}>LOOPEAR</button>
        </div>
      </div>
      <div className="footer">
        <div className="sound" onClick={() => setAudioSrc(cacerolazo)}>
          Cacerolazo
        </div>
        <div className="sound" onClick={() => setAudioSrc(cara)}>
          De qué me hablas viejo
        </div>
        <div className="sound" onClick={() => setAudioSrc(cara)}>
          Estudien vagos
        </div>
        <div className="sound" onClick={() => setAudioSrc(cara)}>
          Le voy a dar en la cara marica
        </div>
      </div>
    </div>
  );
}

export default App
