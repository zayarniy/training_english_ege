const synth = window.speechSynthesis;
let voices = [];
//let voice;

function populateVoiceList() 
{
  voices=synth.getVoices();
  voices = voices.filter(a => a.lang.includes("en") && a.lang.includes("GB") && a.name.includes("Google"));
  //if not exists Google voices
  if (voices.length==0)
  {
    voices = voices.filter(a => a.lang.includes("en") && a.lang.includes("GB"));
  }
  //console.log(voices);
}

//voices=synth.getVoices();



setTimeout(() => {
  
  populateVoiceList();  
}, 1000); 

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
}

function log() {
  console.log("SpeechSynthesisUtterance.onend");
}

function speak(text, callback = log,delay=4000) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  setTimeout(() => {
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (event) {
     console.log('speak end');
      callback();
    };
  
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };
    utterThis.voice = voices[0]
      //alert(voices)
    utterThis.pitch = 1;
    utterThis.rate = 0.8;
    utterThis.lang = "en-GB";
    synth.speak(utterThis);  
  }, 250);
  
}


function playSoundAndCallFunction(soundFile, callback,delay=250) {

  setTimeout(()=>{
    const audio = new Audio(soundFile);
  
    audio.onended = function() {callback();};
  
  audio.play();
  },delay);
}

function playSoundSayTextAndPlaySoundAgain(soundFile, text, callback1) {
  const audio = new Audio(soundFile);
  
  audio.onended = function() {
    speak(text, function() {
      const audioAgain = new Audio(soundFile);
      
      audioAgain.onended = function() {
        callback1();
      };
      
      audioAgain.play();
    });
  };
  
  audio.play();
}


///////////////////////////////////////////////////////////////////
/*
function populateVoiceList() {
  if (typeof synth === "undefined") {
    return;
  }

  const voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    
    document.getElementById("voiceSelect").appendChild(option);
    document.getElementById("voiceSelect").onchange=(e)=>{alert(e);}
  }
}

populateVoiceList();
if (
  typeof synth !== "undefined" &&
  synth.onvoiceschanged !== undefined
) 
{
  synth.onvoiceschanged = populateVoiceList;
}*/