let mediaRecorder=null;
let chunks = [];
const getMicButton = document.getElementById('get-mic');
const startRecordButton = document.getElementById('start-record');
const stopRecordButton = document.getElementById('stop-record');
const playRecordButton = document.getElementById('play-record');
let audio=null;


async function getMic()
{
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
          training.chunks.push(e.data);    
          training.current_chunk=[]
          training.current_chunk.push(e.data);
          //alert(training.current_chunk)
      }
      training.micStatus=MicStatus.READYTORECORD
            training.show_nav02=true;
            training.show_nav01=false;
}

    getMicButton.addEventListener('click', async () => getMic());

function startRecording()
{
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
            mediaRecorder.start();
            timerStart();
           
            training.micStatus=MicStatus.RECORDING;
            console.log(training.micStatus)
            console.log('Recording started');
          } 
    else {
            console.log('Please click "Get Mic" first');
          }
}

function stopRecording(needTimerStop=true)
{
    if (mediaRecorder==null) return;
  if (mediaRecorder.state === 'recording') 
  {
      
        mediaRecorder.stop();
      training.progressValue=0;
      if (needTimerStop) timerStop();
        training.micStatus=MicStatus.READYTOPLAY;
        console.log('Recording stopped');
  } 
  else 
  {
        console.log('No active recording');
  }
}


function playAudio()
{
      if (training.current_chunk!=null) {
        const blob = new Blob(training.current_chunk, { type: training.chunks[0].type });
        const audioURL = URL.createObjectURL(blob);
        audio = new Audio(audioURL);
        audio.play();
        training.progressValue=0;
        timerStart();
          training.micStatus=MicStatus.PLAY;
          audio.addEventListener('ended', () => {
                                              console.log('Аудиофайл завершил проигрывание');
                                              training.progressValue=0;    
                                              training.micStatus=MicStatus.READYTOPLAY;
                                              timerStop();
                                              // Ваши действия по окончании проигрывания аудиофайла
                                            });       
      } else {
        console.log('No recorded audio to play');
      }   
}

function stopAudio(needTimerStop=true)
{
    if (audio==null) return;
    if (needTimerStop) timerStop();
    audio.pause();
    audio.currentTime = 0;
    training.micStatus=MicStatus.READYTOPLAY;  
    
}