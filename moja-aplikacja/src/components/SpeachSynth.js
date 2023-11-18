import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
function SpeachSynth({ text }) {
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance(text)
  const voices = window.speechSynthesis.getVoices();
  const desiredVoice = voices.find((voice) => voice.name === "Google UK English Male");
  msg.voice=desiredVoice
  const speechHandler = (msg) => {
    msg.text = text
    window.speechSynthesis.speak(msg)
  }

  return (
    <div className='App'>

      <button
      className="mt-2"
      >     
      {console.log("XD")}
        <FontAwesomeIcon icon={faVolumeHigh} onClick={() => speechHandler(msg)}/>
      </button>
    </div>
  )
}

export default SpeachSynth