let mediaRecorder = null;
let chunks = [];
const getMicButton = document.getElementById('get-mic');
const startRecordButton = document.getElementById('start-record');
const stopRecordButton = document.getElementById('stop-record');
const playRecordButton = document.getElementById('play-record');
let audio = null;

getMicButton.addEventListener('click', async () => getMic());

async function getMic() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => {
    training.chunks.push(e.data);
    training.current_chunk = []
    training.current_chunk.push(e.data);
    console.log('data available:' + training.chunks.length)
  }
  mediaRecorder.onstart = (e) => {
    console.log('Recording started');
  }
  mediaRecorder.onstop = (e) => {
    console.log('Recording stoped');
  }
  training.show_nav02 = true;
  training.show_nav01 = false;
}


function startRecording(record = false, directTimer = true, directProgress = true, time = 90, next = true) {
  //if (mediaRecorder && mediaRecorder.state === 'inactive') 
  {
    try {
      mediaRecorder.start();
    }
    catch (err) {
      console.log(err)
    }
    //timerStart(true, true, training.maxRecTime);
    timerStart(record, directTimer, directProgress, training.maxRecTime, next);
    if (training.micStatus != MicStatus.AUTORECORDING)
      training.micStatus = MicStatus.RECORDING;
    //console.log(training.micStatus)
  }
  //else 
  {
    console.log('Please click "Get Mic" first');
  }
}

function stopRecording(needTimerStop = true) {
  if (mediaRecorder == null) return;
  if (mediaRecorder.state === 'recording') {

    mediaRecorder.stop();
    training.progressValue = 0;
    if (needTimerStop) timerStop();
    if (training.micStatus != MicStatus.AUTORECORDING)
      training.micStatus = MicStatus.READYTOPLAY;
    //console.log('Recording stopped');
  }
  else {
    //console.log('No active recording');
  }
}



function playAudio() {
  if (training.current_chunk != null) {
    const blob = new Blob(training.current_chunk, { type: training.chunks[0].type });
    const audioURL = URL.createObjectURL(blob);
    audio = new Audio(audioURL);
    audio.play();
    training.progressValue = 0;
    timerStart();
    training.micStatus = MicStatus.PLAY;
    audio.addEventListener('ended', () => {
      console.log('Аудиофайл завершил проигрывание');
      training.progressValue = 0;
      training.micStatus = MicStatus.READYTOPLAY;
      timerStop();
      // Ваши действия по окончании проигрывания аудиофайла
    });
  } else {
    console.log('No recorded audio to play');
  }
}

function stopAudio(needTimerStop = true) {
  if (audio == null) return;
  if (needTimerStop) timerStop();
  audio.pause();
  audio.currentTime = 0;
  training.micStatus = MicStatus.READYTOPLAY;

}

navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
  permissionStatus.onchange = () => {
    console.log('Изменение доступа к микрофону');
    //training.mic_message = 'микрофон не доступен'
    // Дополнительные действия при изменении доступа к микрофону
  };
});

