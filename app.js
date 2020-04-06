const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const greetings = [
    'Im good you little piece of love',
    'Doing good homeboi',
    'leave me alone'
];

const weather = ['Weather is fine', 'You need a tan'];

try {
    const SpeechRecognition = 
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log('voice is actived');
    };

    recognition.onresult = (event) => {
        console.log(event);
        const current = event.resultIndex;

        const transcript = event.results[current][0].transcript;
        content.textContent = transcript;
        readOutLoud(transcript);
    };

    //add the Listener to the btn
    btn.addEventListener('click', () => {
        recognition.start();
    })
    
    function readOutLoud(message) {
        const speech = new SpeechSynthesisUtterance();

        speech.text = "i don't know what you said";

        if (message.includes("i don't know what you said")) {
            const finalText = 
                greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText;
        }

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
        // console.log(message);
        // console.log(speech);
    }

} catch (err) {
    console.log(err);
    alert('O seu navegador não tem suporte ao reconhecimento de voz');
}