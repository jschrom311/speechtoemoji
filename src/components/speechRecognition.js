import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import translate from 'moji-translate';

/*const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}*/
const options = {
  autoStart: true
}

class Dictaphone extends Component {
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <span>{translate.translate(transcript)}</span>
      </div>
    )
  }
}

//Dictaphone.propTypes = propTypes

export default SpeechRecognition(options)(Dictaphone)
