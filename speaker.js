const synth = window.speechSynthesis;
let voices = [];
let voice;

function populateVoiceList() 
{

  voices = voices.filter(a => a.lang.includes("en") && a.lang.includes("GB"))
}

//voices=synth.getVoices();



//populateVoiceList();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
}

function log() {
  console.log("SpeechSynthesisUtterance.onend");
}

function speak(text, callback = log) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.onend = function (event) {

    callback();
  };

  utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror");
  };
  utterThis.voice = voice;//voices[1]
  //alert(voices)
  utterThis.pitch = 1;
  utterThis.rate = 0.8;
  utterThis.lang = "en-GB";
  synth.speak(utterThis);
}

///////////////////////////////////////////////////////////////////
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
}