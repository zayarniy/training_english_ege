let voices = [];

function populateVoiceList() {
  voices=voices.filter(a=>a.lang.includes("en") && a.lang.includes("GB"))
}

const synth = window.speechSynthesis;



populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function log()
{
    console.log("SpeechSynthesisUtterance.onend");    
}

function speak(text,callback=log) 
{    
    if (synth.speaking) 
    {
      console.error("speechSynthesis.speaking");
      return;
    }

const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (event) 
    {
       
        callback();
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
