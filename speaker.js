let voices = [];

function populateVoiceList() {
  voices=voices.filter(a=>a.lang.includes("en") && a.lang.includes("GB"))
}

const synth = window.speechSynthesis;

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(text) 
{    
    if (synth.speaking) 
    {
      console.error("speechSynthesis.speaking");
      return;
    }

const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (event) 
    {
       console.log("SpeechSynthesisUtterance.onend");
    };
    
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };
    utterThis.voice=voices[0]
    utterThis.pitch = 1;
    utterThis.rate = 0.8;
    utterThis.lang="en-GB";
    synth.speak(utterThis);  
}
