const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const greetings = [
    'Olá, tudo vai ficar bem',
    'Bom dia',
    'Boa noite'
];

try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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

        speech.text = 'A Google Cloud Text-to-Speech converte texto de mais de 30 idiomas e variações em fala e conta com mais de 180 vozes. Ela aplica a pesquisa inovadora sobre síntese de fala (WaveNet) e as redes neurais avançadas do Google para oferecer áudio de alta fidelidade. Com a API fácil de usar, é possível criar interações realistas com os usuários e transformar o atendimento ao cliente e a interação com dispositivos e outros aplicativos.';

        if (message.includes('Bom dia')) {
            const finalText = greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText;
        }

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

       // speech.text = message;
        window.speechSynthesis.speak(speech);
        console.log(message);
        console.log(speech);


        addEventListener('keypress', event => {
            console.log(event);
            if (event.code == 'Space') {
    
                console.log('Space bar pressed');
    
                // if (window.speechSynthesis.paused != true) {
                //     console.warn('WTF')
                //     window.speechSynthesis.pause();
    
                // }

                // if (window.speechSynthesis.paused == true) {
                //     window.speechSynthesis.resume();
                // }

            }
        });

    }

} catch (err) {
    console.log(err);
    alert('O seu navegador não tem suporte ao reconhecimento de voz');
}