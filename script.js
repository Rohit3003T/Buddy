const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

const responses = {
    "hello": "Hello there! How can I assist you?",
    "how are you": "I'm just a computer program, so I don't have feelings, but thank you for asking!",
    "what's the weather like today": "The weather forecast for today is partly cloudy with a chance of rain.",
    "i love you": "I love you too, but as a friend."
};

const textToSpeech = (text) => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    synthesis.speak(utterance);

    // Automatically start listening again after speech is finished
    utterance.onend = () => {
        recognition.start();
        output.innerHTML = 'Listening...';
    };
};

startBtn.addEventListener('click', () => {
    recognition.start();
    output.innerHTML = 'Listening...';
});

recognition.onresult = function(event) {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase();
    output.innerHTML = 'You said: ' + command;

    // Check if the recognized command exists in responses
    if (responses.hasOwnProperty(command)) {
        const reply = responses[command];
        textToSpeech(reply);
    } else {
        const reply = "I'm sorry, I didn't catch that. Can you please repeat?";
        textToSpeech(reply);
    }
};

recognition.onspeechend = function() {
    recognition.stop();
    output.innerHTML = 'Stopped listening. Click to start again.';
};

recognition.onerror = function(event) {
    output.innerHTML = 'Error occurred in recognition: ' + event.error;
};
