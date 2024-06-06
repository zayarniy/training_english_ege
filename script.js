let logoClickCounter = 0;

const MicStatus = { NOTREADY: 0, READYTORECORD: 1, RECORDING: 2, READYTOPLAY: 3, PLAY: 4, AUTORECORDING: 5, PREPARE: 10 }
let timer;
let Tasks = Task1;
let data = {
    head1: "Внимание",
    main_text: 'На следующем этапе тренажёр попытается получить доступ к микрофону.<br> У Вас появится запрос на использование сайтом микрофона.<br>Если вы планируете использовать функцию записи, то разрешите сайту использовать микрофон.',
    head2: '',
    head3: '',
    image1: '1px.png',
    image2: '1px.png',
    text2: '',
    isShowNav01: false,
    isShowRecorder: false,
    isShowMain: false,
    isShowMain2: false,
    isShowCountdown: false,
    isStartCountdown: false,
    isShowHeader1: true,
    isShowHeader2: false,
    isShowHeader3: false,
    isShowPrepare: false,
    isShowImage1: false,
    isShowImage2: false,
    isShowResult: false,
    isShowCaption: false,
    isShowAudioContainer: false,
    isShowSelect: true,
    micStatus: MicStatus.NOTREADY,
    recTime: 0,
    progressValue: 0,
    maxRecTime: 10,
    rec_nav_text: 'Перейти к экзамену',
    countDownText: 'Be ready for the test',
    countDown: 10,
    level: 0,
    levelTxt: '',
    chunks: [],
    current_chunk: [],
    preparationTimeText: 'Preparation 01:30',
    answerTimeText: 'Answer 01:30',
    primary_button: 'Понятно',
    task_filename: 'tasks/2/task2.pdf',
    mic_message: ''
}



let training = new Vue({
    el: '#app', data,
    computed: {
        formatTime() {
            return (this.recTime + "").toMMSS();
        },
        currentIcon() {
            switch (this.micStatus) {
                case MicStatus.NOTREADY:
                    return 'fa-solid  fa-microphone-slash icon-size';
                case MicStatus.READYTORECORD:

                    if (mediaRecorder == null)
                        return 'fa-solid fa-record-vinyl icon-size red';
                    else
                        return 'fa-solid fa-record-vinyl icon-size red';
                case MicStatus.READYTOPLAY:
                    return 'fa-solid fa-circle-play icon-size';
                case MicStatus.RECORDING:
                    if (mediaRecorder == null)
                        return 'fa-solid fa-circle-stop icon-size gray';
                    else
                        return 'fa-solid fa-circle-stop icon-size red';

                case MicStatus.AUTORECORDING:
                    if (mediaRecorder == null)
                        return 'fa-solid fa-circle-stop icon-size gray';
                    else
                        return 'fa-solid fa-circle-stop icon-size red';

                case MicStatus.PLAY:
                    return 'fa-solid fa-circle-stop icon-size';
                case MicStatus.PREPARE:
                    return 'fas fa-tasks icon-size'
                case MicStatus.AUTORECORDING:
                    if (mediaRecorder == null)
                        return 'fa-solid fa-microphone icon-size gray';
                    else
                        return 'fa-solid fa-microphone icon-size red';


            }
        },
        /*
           progressStep()
           {
               return 100/this.maxRecTime;
           }
          */
    },
    /*
    mounted() {
      this.startCountdown();
    },*/
    methods: {
        toggleIcon() {
            console.log(this.micStatus)
            switch (this.micStatus) {
                case MicStatus.NOTREADY:
                    getMic();
                    break;
                case MicStatus.READYTORECORD:
                    startRecording();
                    break;
                case MicStatus.READYTOPLAY:
                    playAudio();
                    break;
                case MicStatus.RECORDING:
                    stopRecording();
                    break;
                case MicStatus.PLAY:
                    stopAudio();
                    break;
                //case MicStatus.PREPARE:
                //     timerStart();
            }
            console.log(this.micStatus)
        },

        Level() {
            let Levels = ['start', 'mic-test', 'count-down-prepair', 'prepair1',
                'count-down-task', 'task1', 'count-down-prepair', 'prepair2', 'count-down-task',
                'task2', 'task22', 'task23', 'task24', 'count-down-prepair', 'prepair3', 'count-down-task', 'task31', 'task32', 'task33', 'task34', 'task35', 'count-down-prepair', 'prepair4', 'count-down-task', 'task4', 'download', 'start'];
            //alert(this.level)
            stopRecording();
            stopAudio();
            synth.cancel();
            this.level++;
            //this.levelTxt = Levels[this.level]
            //console.log('Level:'+this.level)

            switch (Levels[this.level]) {
                case 'mic-test'://Mic test
                    training.micStatus = MicStatus.READYTORECORD;
                    mic_test('Внимание', 'Нажмите кнопку записи внизу, произнесите несколько слов, остановите запись, затем попробуйте воспроизвести.<br> Если вы уже делали это, можете сразу перейти к выполнению задания.')


                    break;
                case 'count-down-prepair'://Countdown

                    count_down('', '', 'Be ready for the test', 5)
                    break;
                case 'count-down-task'://Countdown
                    count_down('', '', 'Be ready for the answer', 5)
                    break;

                case '':
                    //read task and prepair
                    this.Level(); //read_task(headers[1],mains.html[1],headers[1],90)
                    break;
                case 'prepair1'://Prepair   
                    //Выталкиваем запись проверки звука
                    if (this.chunks.length > 0) this.chunks.pop();
                    speak('Now we are ready to start. Task 1')
                    setTimeout(() => {
                        training.head1 = Tasks.task1.header;
                        training.main_text = Tasks.task1.text;
                        training.isShowMain = true;
                        prepair('', '', '', 90)
                        //setTimeout(speak(Tasks.task1.introduction1, 0, () => { speak(Tasks.task1.introduction2, 0, () => { }) }), 3000);
                    }, 3500);
                    break;
                case 'task1'://task
                    speak('Start speaking please', 0, () => {
                        training.head1 = 'Read the text aloud';
                        training.main_text = Tasks.task1.text;
                        training.isShowMain = true;
                        task('', '', '', 90)
                        training.answerTimeText = "Answer 00:20"
                        document.getElementById('btnRecNav').disabled = true;
                        setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    });

                    break
                case 'prepair2':
                    speak('Task 2', 0, () => {

                        training.image1 = Tasks.task2.image;
                        training.head1 = Tasks.task2.header1
                        training.head2 = Tasks.task2.header2
                        training.head3 = Tasks.task2.header3;
                        training.main_text = Tasks.task2.text1;
                        training.text2 = Tasks.task2.text2;
                        training.isShowMain = true;
                        training.isShowHeader1 = true;
                        training.isShowHeader2 = true;
                        training.isShowHeader3 = true;
                        training.isShowImage1 = true;
                        training.isShowPrepare = true;
                        training.isShowCountdown = false;
                        training.answerTimeText = "Answer 00:20"
                        prepair('', '', '', 90);
                    });
                    break;

                case 'task2'://task
                    speak('Question 1');
                    training.image = Tasks.task2.image;
                    training.isShowImage1 = true;
                    training.isShowCaption = false;
                    training.isShowRecorder = true;
                    training.isShowCountdown = false;
                    training.isShowHeader3 = false;
                    training.text2 = '';
                    training.isShowMain = true;
                    // recAnswers(Tasks.task2.questions, 20);
                    task('', '', '', 21);
                    training.isShowRecorder = true;
                    training.isShowMain = true;
                    training.progressValue = 0;
                    training.maxRecTime = 20;
                    training.micStatus = MicStatus.AUTORECORDING;
                    training.main_text = 'Question 1: ' + Tasks.task2.questions[0];
                    training.recTime = 0;
                    training.isShowPrepare = false;
                    training.answerTimeText = '';
                    training.preparationTimeText = '';
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    //startRecording();                    
                    break
                case 'task22'://task
                    speak('Question 2');

                    training.image = Tasks.task2.image;
                    training.isShowImage1 = true;
                    training.isShowRecorder = true;
                    //recAnswers(Tasks.task2.questions, 20);
                    //task(headers1[1], tasks[1], '', 90);
                    task('', '', '', 21);
                    training.isShowRecorder = true;
                    training.isShowMain = true;
                    training.progressValue = 0;
                    training.maxRecTime = 20;
                    training.micStatus = MicStatus.AUTORECORDING;
                    training.main_text = 'Question 2: ' + Tasks.task2.questions[1];
                    training.recTime = 0;
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    //startRecording();                    
                    break
                case 'task23'://task
                    speak('Question 3');
                    training.image = Tasks.task2.image;
                    training.isShowImage1 = true;
                    training.isShowRecorder = true;
                    //recAnswers(Tasks.task2.questions, 20);
                    //task(headers1[1], tasks[1], '', 90);
                    task('', '', '', 21);
                    training.isShowRecorder = true;
                    training.isShowMain = true;
                    training.progressValue = 0;
                    training.maxRecTime = 20;
                    training.micStatus = MicStatus.AUTORECORDING;
                    training.main_text = 'Question 3: ' + Tasks.task2.questions[2];
                    training.recTime = 0;
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    //startRecording();                    
                    break
                case 'task24'://task
                    speak('Question 4')
                    training.image = Tasks.task2.image;
                    training.isShowImage1 = true;
                    training.isShowRecorder = true;
                    //recAnswers(Tasks.task2.questions, 20);
                    //task(headers1[1], tasks[1], '', 90);
                    task('', '', '', 21);
                    training.isShowRecorder = true;
                    training.isShowMain = true;
                    training.progressValue = 0;
                    training.maxRecTime = 20;
                    training.micStatus = MicStatus.AUTORECORDING;
                    training.main_text = 'Question 4: ' + Tasks.task2.questions[3];
                    training.recTime = 0;
                    training.preparationTimeText = "Preparation 01:30"
                    training.answerTimeText = 'Answer 00:40';
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    //startRecording();                    
                    break
                case 'prepair3':
                    speak('Task 3', 0, () => {
                        training.isShowImage1 = false;
                        training.head1 = Tasks.task3.header;
                        training.isShowHeader1 = true;
                        training.isShowImage1 = false;
                        training.isShowImage2 = false;
                        //training.head2 = headers2[1]
                        //training.head3 = headers3[1]
                        training.isShowHeader2 = false;
                        training.isShowHeader3 = false;
                        training.isShowPrepare = true;
                        training.isShowCountdown = false;
                        training.main_text = "";
                        training.isShowMain = true;
                        training.micStatus = MicStatus.PREPARE;
                        //speak(Tasks.task3.introduction1, 0, () => { speak(Tasks.task3.introduction2, 0, () => { training.isShowRecorder = true; this.Level(); }) });
                        speak(Tasks.task3.introduction1, 0, () => { speak(Tasks.task3.introduction2, 0, () => { }) });
                        //training.preparationTimeText='';
                        //training.answerTimeText='Answer 00:40';
                        prepair('', '', '', 90)
                    });
                    break;
                case 'task3':

                    training.micStatus = MicStatus.AUTORECORDING;
                    training.isShowMain = true;
                    training.isShowImage = false;
                    training.isShowHeader1 = true;
                    training.isShowCountdown = false;
                    training.head1 = 'Interview';
                    training.isShowPrepare = false;
                    training.isShowPrepare = true;
                    training.main_text = Tasks.task3.introduction;
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 15000);

                    break;
                case 'task31':
                    training.head1 = 'Interview. Question 1';
                    task3();
                    playSoundSayTextAndPlaySoundAgain(Sounds.sound1, Tasks.task3.interviewer[0], () => { startRecording(false, false, true, training.maxRecTime); });
                    break;
                case 'task32':
                    training.head1 = 'Interview. Question 2';
                    task3();
                    playSoundSayTextAndPlaySoundAgain(Sounds.sound1, Tasks.task3.interviewer[1], () => { startRecording(false, false, true, training.maxRecTime); });
                    break;
                case 'task33':
                    training.head1 = 'Interview. Question 3';
                    task3();
                    playSoundSayTextAndPlaySoundAgain(Sounds.sound1, Tasks.task3.interviewer[2], () => { startRecording(false, false, true, training.maxRecTime); });
                    break;
                case 'task34':
                    training.head1 = 'Interview. Question 4';
                    task3();
                    playSoundSayTextAndPlaySoundAgain(Sounds.sound1, Tasks.task3.interviewer[3], () => { startRecording(false, false, true, training.maxRecTime); });
                    break;
                case 'task35':
                    training.head1 = 'Interview. Question 5';
                    task3();
                    playSoundSayTextAndPlaySoundAgain(Sounds.sound1, Tasks.task3.interviewer[4], () => { startRecording(false, false, true, training.maxRecTime); });
                    break;
                case 'prepair4':
                    training.isShowMain = false;
                    training.isShowMain2 = true;
                    training.isShowCaption = true;
                    training.isShowImage1 = true;
                    training.image1 = Tasks.task4.images[0]
                    training.image2 = Tasks.task4.images[1]
                    training.isShowImage2 = true;
                    training.head1 = Tasks.task4.header;
                    training.isShowHeader1 = true;
                    training.isShowHeader2 = false;
                    training.isShowHeader3 = false;
                    training.isShowPrepare = true;
                    training.isShowCountdown = false;
                    training.main_text = Tasks.task4.text;
                    training.text2 = Tasks.task4.text2;
                    training.micStatus = MicStatus.PREPARE;
                    training.preparationTimeText = 'Preparation 02:30';
                    training.answerTimeText = 'Answer 03:00';
                    //speak(Tasks.task3.introduction1,()=>{speak(Tasks.task3.introduction2,console.log("..."))});
                    prepair('', '', '', 150)
                    break;
                case 'task4':
                    //training.text2='';    
                    //training.main_text='';          
                    //training.head1 = 'Read the text aloud';
                    //training.main_text = Tasks.task1.text;
                    training.isShowMain = false;
                    training.isShowMain2 = true;
                    training.isShowImage1 = true;
                    training.image1 = Tasks.task4.images[0]
                    training.image2 = Tasks.task4.images[1]
                    training.isShowImage2 = true;
                    training.head1 = Tasks.task4.header;
                    training.isShowHeader1 = true;
                    training.isShowHeader2 = false;
                    training.isShowHeader3 = false;
                    training.isShowPrepare = true;
                    training.isShowCountdown = false;
                    training.main_text = Tasks.task4.text;
                    training.text2 = Tasks.task4.text2;
                    training.micStatus = MicStatus.PREPARE;
                    training.preparationTimeText = 'Preparation 02:30';
                    training.answerTimeText = 'Answer 03:00';
                    task('', '', '', 180)
                    document.getElementById('btnRecNav').disabled = true;
                    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 5000);
                    break
                case 'download'://download

                    timerStop();
                    training.primary_button = 'К началу';
                    training.head1 = "Results";
                    training.isShowHeader2 = false;
                    training.isShowHeader2 = false;
                    training.isShowImage2 = false;
                    training.text2 = "";
                    training.main_text = "To get results click button below";
                    training.image1 = '';
                    training.isShowImage1 = false;
                    training.isShowNav01 = true;
                    training.isShowRecorder = false;
                    training.isShowMain = true;
                    training.isShowMain2 = false;
                    training.isShowCountdown = false;
                    training.isStartCountdown = false;
                    training.isShowResult = true;
                    training.isShowAudioContainer = true;
                    training.rec_nav_text = 'Завершить';
                    setTimeout(() => audioContainerSet('audioContainer', this.chunks), 200);
                    break;

                case 'start':

                    document.location.reload();
                    isShowMain = false;
                    break;

            }
        },
        downloadRecording() {
            console.log(this.chunks);
            const zip = new JSZip();
            let index = 1;
            this.chunks.forEach(chunk => {
                const blob = new Blob([chunk], { type: 'audio/webm' });
                zip.file('recording ' + index + '.webm', blob);
                index++;
            });
            zip.generateAsync({ type: 'blob' })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'download.zip';
                    link.click();
                });
        }
    }

}
);


function startCountdown() {
    if (training.isStartCountdown) {
        let si = setInterval(() => {
            if (training.countDown > 1) {
                training.countDown--;
            } else {
                clearInterval(si)
                training.countDown = 0;
                training.Level();
            }
        }, 1000);
    }
}

function mic_test(head_text = '', main_text = '') {
    training.head1 = head_text;
    training.main_text = main_text;
    training.isShowNav01 = false;
    training.isShowRecorder = true;
    training.isShowMain = true;
    training.isShowCountdown = false;
    training.isShowAudioContainer = false;
}

function count_down(text_speak = '', head_text = '', main_text = '', countDown = 10) {
    timerStop();

    training.head1 = head_text;
    training.main_text = main_text;
    training.countDownText = main_text;

    training.isShowNav01 = false;
    training.isShowRecorder = false;
    training.isShowMain = false;
    training.isShowMain2 = false;
    training.isShowCountdown = true;
    training.isShowPrepare = true;
    training.countDown = countDown;
    training.isStartCountdown = true;
    startCountdown();
    speak(text_speak, countDown * 1000);



}
function prepair(head_text, main_text, text_speak, maxRecTime) {
    timerStop();

    //training.isShowPrepare=true;
    //training.head1 = head_text;
    //training.main_text = main_text;//mains.html[1];
    training.isShowNav01 = false;
    training.isShowRecorder = true;
    //training.isShowMain = true;
    training.isShowCountdown = false;
    training.micStatus = MicStatus.PREPARE;
    training.progressValue = 0;
    training.recTime = 0;
    training.maxRecTime = maxRecTime;
    training.rec_nav_text = 'Готов';
    //startPrepairTimer(90);
    timerStart(false, false, true, maxRecTime);
}

function task(head_text, main_text, text_speak, maxRecTime) {
    timerStop();
    if (head_text != '')
        training.head1 = head_text;
    if (main_text != '')
        training.main_text = main_text;
    training.isShowNav01 = false;
    training.isShowRecorder = true;
    //training.isShowMain = true;
    //training.isShowImage=true;
    training.isShowCountdown = false;
    training.isStartCountdown = false;
    training.isShowPrepare = false;
    training.rec_nav_text = 'Завершить';
    training.micStatus = MicStatus.AUTORECORDING;

    training.progressValue = 0;
    training.maxRecTime = maxRecTime;
    training.recTime = 0;
    //timerStop();
    startRecording(false, false, true, maxRecTime);
    //speak(text_speak,()=>{startRecording();    });

}

function recAnswers(tasks, maxRecTime) {
    training.isShowRecorder = true;
    training.isShowMain = true;

    training.progressValue = 0;
    training.maxRecTime = maxRecTime;
    training.micStatus = MicStatus.AUTORECORDING;
    training.main_text = tasks[i];
    training.recTime = 0;
    startRecording(next = false);

}


function task3() {
    timerStop();
    training.isShowImage1 = false;
    training.isShowHeader1 = true;
    training.isShowRecorder = true;
    training.isShowMain = true;
    training.isShowCountdown = false;
    training.progressValue = 0;
    training.maxRecTime = 40;
    training.micStatus = MicStatus.AUTORECORDING;
    training.recTime = 0;
    training.main_text = '';
    document.getElementById('btnRecNav').disabled = true;
    setTimeout(() => document.getElementById('btnRecNav').disabled = false, 15000);
}

function read_task(head_text, main_text, text_speak, maxRecTime) {
    timerStop();
    training.head1 = head_text;
    training.main_text = '';//mains.html[1];
    training.isShowNav01 = false;
    training.isShowRecorder = true;
    training.isShowMain = false;
    training.isShowCountdown = false;
    training.isShowPrepare = false;
    training.micStatus = MicStatus.PREPARE;
    training.progressValue = 0;
    training.recTime = 0;
    training.maxRecTime = maxRecTime;
    training.rec_nav_text = 'К заданию';
    //timerStart(record:false,direct:false,90);   
    timerStart(false, false, true, 90);
}

//record=true,
//directTimer - направление счета таймера true - forward, false - backward
//directProgress - направление прогресса
// time - seconds
function timerStart(record = false, directTimer = true, directProgress = true, time = 90, next = true) {
    training.recTime = 0;
    training.maxRecTime = time;
    let progressStep = 100 / time;
    if (directProgress)
        training.progressValue = 0;
    else {
        training.progressValue = 100;
        progressStep *= -1;
    }
    let t = 0;
    timer = setInterval(
        () => {
            t++;
            if (t < time) {
                if (!directTimer)
                    training.recTime = time - t;
                else
                    training.recTime = t;
                training.progressValue += progressStep;
            }

            else {
                timerStop();
                if (training.micStatus == MicStatus.PREPARE ||
                    training.micStatus == MicStatus.AUTORECORDING) {
                    training.micStatus = MicStatus.NOTREADY;
                    if (next)
                        training.Level();
                }
            }
        }, 1000);
}

function timerStop() {
    console.log("timer stop")
    training.progressValue = 0;
    if (training.micStatus == MicStatus.PLAY) stopAudio(false);
    if (training.micStatus == MicStatus.RECORDING || training.micStatus == MicStatus.AUTORECORDING) stopRecording(false);
    clearInterval(timer);
    training.recTime = 0;
}

function audioContainerSet(audioContainerId, chunks) {
    // Создаем контейнер для аудиоплееров на веб-странице
    const audioContainer = document.getElementById(audioContainerId);
    //document.body.appendChild(audioContainer);

    // Проходимся по массиву "chunks" и создаем аудиоплееры
    chunks.forEach((chunk, index) => {
        // Создаем элемент аудиоплеера
        if (index == 0) {
            const textElement = document.createElement('p');
            textElement.style = 'col-4'
            textElement.innerHTML = 'Task 1';
            audioContainer.appendChild(textElement);
        }
        if (index == 1) {
            const textElement = document.createElement('p');
            textElement.style = 'col-4'
            textElement.innerHTML = 'Task 2';
            audioContainer.appendChild(textElement);
        }
        if (index == 5) {
            const textElement = document.createElement('p');
            textElement.style = 'col-4'
            textElement.innerHTML = 'Task 3';
            audioContainer.appendChild(textElement);
        }
        if (index == 10) {
            const textElement = document.createElement('p');
            textElement.style = 'col-4'
            textElement.innerHTML = 'Task 4';
            audioContainer.appendChild(textElement);
        }

        const audioElement = document.createElement('audio');
        // Устанавливаем данные звукового файла из массива "chunk"
        const audioBlob = new Blob([chunk]);
        const audioURL = URL.createObjectURL(audioBlob);
        audioElement.src = audioURL;
        const listItem = document.createElement('span');
        listItem.style = 'col-4'
        listItem.appendChild(audioElement)

        // Устанавливаем атрибуты аудиоплеера
        audioElement.controls = true;
        //audioElement.autoplay = true;

        // Помещаем аудиоплеер в контейнер
        audioContainer.appendChild(listItem);
    });

}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function variant(n) {
    Tasks = AllTasks[n]
    training.isShowSelect = false;
    training.isShowMain = true;
    training.isShowNav01 = true;
    training.task_filename = Tasks.filename;
}


let lcst = null;
function logoClick() {
    if (logoClickCounter > 8) {
        logoClick = 0;
        clearTimeout(lcst)
        showMaterials();
    }
    logoClickCounter++;
    if (lcst == null)
        lcst = setTimeout(() => {
            logoClickCounter = 0;
            clearTimeout(lcst)
        }, 5000);

}

function showMaterials() {
    window.location.href = 'materials.html';
}