//speechSynthesis API entry point
const synth = window.speechSynthesis;

//DOM Elements
var inputForm = document.querySelector('form');
var inputText = document.querySelector('#text-input');
var voiceSelect = document.querySelector('#voice-select');
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('#pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('#rate-value');
var body = document.querySelector('body');

//initizale the voices array
var voices = [];

    //Populating the select element
const getVoices = () =>{
    voices = synth.getVoices(); //returns a list of all the available voices, represented by SpeechSynthesisVoice object
    //We then loop through this list — for each voice we create an option element
    voices.forEach( voice => {
        //create option element
        var option = document.createElement('option');
        //Fill the option with voice and element
        option.textContent = voice.name + ' (' + voice.lang + ')';

        //Set data attributes for each option
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        //Add the option to the select
        voiceSelect.appendChild(option);

    });

}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
    // check is speaking
    if(synth.speaking){
        return;
    }
    if(inputText.value !== ''){
        const speak = new SpeechSynthesisUtterance(inputText.value);
        
        //Get the option selected and its data-name
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through the list of voices to find the exact voice object
        voices.forEach(voice => {
            if(voice.name === selectedVoice)
                speak.voice = voice; // when the voice is found, set the voice to be spoke
        });

        //Set pitch and rate
        speak.rate = rate.value;
        speak.pitch = pitch.value;

        //Speak End
        speak.onend = e =>{
            body.style.background = '#141414';
        };

        //Speak
        synth.speak(speak);

        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';    
    }
}

//Event Listeners
// Text
inputForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    inputText.blur();
});
//Rate Value and pitch
rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice change
voiceSelect.addEventListener('change', e => speak());

