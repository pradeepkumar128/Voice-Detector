if (!("webkitSpeechRecognition" in window)) {
  alert(
    "Your browser doesn't support the Web Speech API. Please use Chrome or Edge"
  );
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  document.querySelector("#start-btn").addEventListener("click", () => {
    recognition.start();
  });
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("result").innerText = `You said : ${transcript}`;
  };

  recognition.onerror = (event) => {
    console.error("speech recognition error", event.error);
  };

  recognition.onstart = () => {
    console.log("speech recognition started");
  };
  recognition.end = () => {
    console.log("speech recognition ended");
  };
}

const resultValue = document.querySelector("#result");
document.querySelector("#read-btn").addEventListener("click", () => {
  let synth = window.speechSynthesis;
  let voices = [];
  PopulateVoices();
  if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
  }

  let toSpeak = new SpeechSynthesisUtterance(resultValue.textContent);
  toSpeak.voice = voices[7];
  synth.speak(toSpeak);

  function PopulateVoices() {
    voices = synth.getVoices();
    voices.forEach((item, index) => console.log(item.name, index));
  }
});
