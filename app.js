const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const greetings = [
    'Não te interessa!',
    'Eu sou foda!',
    'Você acha que eu sei'
];

const weather = ['O tempo está bom', 'Você não sai de casa, por quê quer saber ?'];

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

        speech.text = "Não entendi";

        if (message.includes("como você")) {
            const finalText = 
                greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText;
        }
        if (message.includes("tempo")) {
            const finalText = 
            weather[Math.floor(Math.random() * weather.length)];
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