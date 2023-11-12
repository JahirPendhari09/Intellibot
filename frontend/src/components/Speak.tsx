import React, { useState, ChangeEvent } from "react";

interface SpeakProps {
  value: string;
}

const Speak: React.FC<SpeakProps> = ({ value }) => {

  const [voiceType, setVoiceType] = useState<string>("female");
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1);

  const speak = () => {
    const message = new SpeechSynthesisUtterance(value);
    const voices = window.speechSynthesis.getVoices();

    if (voiceType === "male") {
      message.voice = voices[8];
    } else {
      message.voice = voices[6];
    }

    message.rate = voiceSpeed;
    window.speechSynthesis.speak(message);
  };

  const handleVoiceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVoiceType(e.target.value);
  };

  const handleVoiceSpeedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVoiceSpeed(parseFloat(e.target.value));
  };

  return (
    <div>
      <select value={voiceType} onChange={handleVoiceTypeChange}>
        <option value="" disabled>
          Select Voice Type
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={voiceSpeed} onChange={handleVoiceSpeedChange}>
        <option value="" disabled>
          Select Voice Speed
        </option>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
      </select>
      <button
        onClick={speak}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Speech
      </button>
    </div>
  );
};

export { Speak };
