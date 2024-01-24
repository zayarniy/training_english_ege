const MicStatus= {NOTREADY:0,READYTORECORD:1,RECORDING:2,READYTOPLAY:3,PLAY:4, PREPARE:10}
let headers=['Внимание','Task 1. Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.', "Task 2. Study the advertisement.<br>Welcome to Virtual Reality club!<br>You are considering visiting a computer club and now you'd like to get more information. In 1.5 minutes you are to ask four direct questions to find out about the following:"]
let mains={html:['На следующем этапе тренажёр попытается получить доступ к микрофону. У Вас появится запрос на использование сайтом микрофона.<br>Если вы планируете использовать функцию записи, то разрешите сайту использовать микрофон.','Critical thinking has a long tradition in both psychological and educational research, but with different emphases. There is cross-disciplinary agreement on defining Critical Thinking as the ability to evaluate the content of information and to derive conclusions about the extent to which one can believe this information or discuss what one should think of it. Especially against the background of the increasing information density of the past three decades - since the breakthrough of the World Wide Web - the various Internet search engines and now developed chatbots - Critical Thinking is to be considered a key competence in university teaching. The promotion of Critical Thinking is one of the central educational tasks and is identified as a target category in the European Qualifications Framework for Lifelong Learning. In this respect, Critical Thinking not only subsumes individual competencies such as problem-solving competence and decision-making, but also combines them through their further development into reflective competence. Reflective competence thus is elementary for Critical Thinking because it continuously reviews or questions existing norms, values and quality criteria in the sciences, but also in the organizational academic context.','1)	location<br>2) variety of games<br>3)	opening hours       <br>4)	price per hour'],images:['','','1-virtual.jpg'],answers:['','Where is your computer club located?<br>What games can I play there?<br>What are the opening hours of your computer club?<br>What is the price per hour?']}
let bottoms=['']
let timer;
        
        let data={
                  head:headers[0],
                  main_text:mains.html[0],
                  image:'1px.png',
                  isShowNav01:true,
                  isShowNav02:false,
                  isShowMain:true,
                  isShowCountdown:false,
                  isStartCountdown:false,
                  isShowPrepare:false,
                  isShowImage:false,
                  isShowResult:false,
                  micStatus:MicStatus.NOTREADY,
                  recTime:0,
                  progressValue:0,
                  maxRecTime:10,
                  rec_nav_text:'Перейти к экзамену',
                  countDown: 10,
                  level:0,
                  chunks:[],
                  current_chunk:[]
                  
                }    
        function timerRecStart()
        {            
            training.recTime=0;
            training.progressValue=0;
            timer=setInterval(
                ()=>
                {
                    if (training.recTime<training.maxRecTime)
                    {
                        training.recTime++;
                        training.progressValue+=training.progressStep;
                    }
                     
                    else
                        {
                            timerStop();
                            if (training.micStatus==MicStatus.PREPARE) 
                            {
                                training.micStatus=MicStatus.NOTREADY;
                                training.Level();
                            }
                        }
                },1000);
        }

        function timerRecStop()
        {
            console.log("timer stop")
            if (training.micStatus==MicStatus.PLAY) stopAudio(false);
            if (training.micStatus==MicStatus.RECORDING)  stopRecording(false);
            clearInterval(timer);
            training.recTime=0;
        }


        let training=new Vue({el: '#app',data,
                             computed:{
                             formatTime()
                                 {
                                   return (this.recTime+"").toMMSS();
                                 },
                             currentIcon(){
                                 switch (this.micStatus)
                                     {
                                         case MicStatus.NOTREADY:
                                            return 'fa-solid  fa-microphone-slash icon-size';
                                         case MicStatus.READYTORECORD:
                                            return 'fa-solid fa-record-vinyl icon-size red';
                                         case MicStatus.READYTOPLAY:
                                             return 'fa-solid fa-circle-play icon-size';
                                         case MicStatus.RECORDING:
                                             return 'fa-solid fa-circle-stop icon-size red';
                                         case MicStatus.PLAY:
                                             return 'fa-solid fa-circle-stop icon-size';
                                         case MicStatus.PREPARE:
                                             return 'fas fa-tasks icon-size'
                                             
                                             
                                     }
                                },
                              progressStep()
                                 {
                                     return 100/this.maxRecTime;
                                 }
     
                             },
                              mounted() {
                                this.startCountdown();
                              },                              
                             methods:{
                                 toggleIcon(){
                                     console.log(this.micStatus)
                                     switch(this.micStatus){
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
                                 startCountdown() {  
                                 if (this.isStartCountdown){
                                    let si=setInterval(() => {
                                    if (this.countDown > 0) {
                                        this.countDown--;
                                    } else {                                                                   
                                    clearInterval(si)
                                    this.countDown=0;
                                    this.Level();
                                }
                                }, 1000);
                                }
                             },
                                 Level()                                      
                                {
                                    //alert(this.level)
                                    stopAudio();
                                    stopRecording();
                                    synth.cancel();
                                    this.level++;
                                    console.log('Level:'+this.level)
                                    
                                    switch(this.level)
                                        {
                                            case 1://Mic test
                                                mic_test('Внимание', 'Нажмите кнопку записи внизу, произнесите несколько слов, остановите запись, затем попробуйте воспроизвести. Если вы уже делали это, можете сразу перейти к выполнению задания.')
                                            break;
                                          case 2://Countdown
                                          case 6:                                                          
                                                count_down('Be ready for test','','',2)
                                            break;
                                            case 3:
                                                //read task
                                                read_task(headers[1],'',headers[1],90)
                                                break;
                                            case 4://Prepair    
                                                prepair(headers[1],mains.html[1],headers[1], 90)
                                                  break;
                                            case 5://task
                                                task('Read the text aloud',mains.html[1],'',90) 
                                                break
                                            case 7://read task                                            
                                                //prepair(headers[2],mains.html[2],headers[2], 90)
                                                //task(headers[2],mains.html[2],headers[2], 90) 
                                                read_task(headers[2],mains.html[2],headers[2], 90)
                                                  break;
                                            case 8:
                                                prepair("Get ready to speak answer",mains.html[2],headers[2],90)
                                                break;

                                            case 9://task
                                                task(headers[2],mains.html[2],'',90) 
                                                break
                                            case 10://show answers
                                                prepair('Samples of correct answers',mains.answers[1],headers[2],90)
                                                break;
                                            
                                                break;
                                                
                                            case 11://download
                                                  timerStop();
                                                  training.head="Results";
                                                  training.main_text="To get results click button below";
                                                  training.image='';
                                                  training.isShowImage=false;                                             
                                                  training.isShowNav01=false;
                                                  training.isShowNav02=false;
                                                  training.isShowMain=true;                  
                                                  training.isShowCountdown=false;
                                                  training.isStartCountdown=false;
                                                  training.isShowResult=true;
                                                  training.rec_nav_text='Завершить';
                                                  //training.micStatus=MicStatus.READYTORECORD;
                                                  //training.progressValue=0;
                                                  //training.maxRecTime=90;
                                                  //timerStart();
                                                     
                                            break;    
                                                
                                            default:
                                                  training.level=1;
                                                   training.head=headers[0];
                                                  training.main_text=mains.html[0];
                                                  training.isShowNav01=true;
                                                  training.isShowImage=false;
                                                  training.isShowNav02=false;
                                                  training.isShowMain=true;                  
                                                  training.isShowCountdown=false;
                                            break;

                                        }
                                },
                                 downloadRecording() {
                                     console.log(this.chunks);
                                     this.chunks.forEach((chunk)=>
                                                         {
                                    const blob = new Blob([chunk], { type: 'audio/webm' });
                                    const url = window.URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'recording.webm';
                                     
                                    link.click();
                                     });
                }
                             }
                             });

function mic_test(head_text='',main_text='')
{
      training.head=head_text;
      training.main_text=main_text;
      training.isShowNav01=false;
      training.isShowNav02=true;
      training.isShowMain=true;                  
      training.isShowCountdown=false;
}

function count_down(text_speak='',head_text='',main_text='',countDown=10)
{
    timerStop();
      //speak(text_speak);
      training.head=head_text;
      training.main_text=main_text;
      training.isShowNav01=false;
      training.isShowNav02=false;
      training.isShowMain=false;                  
      training.isShowCountdown=true;
      training.isShowPrepare=true;
      training.countDown=countDown;
      training.isStartCountdown=true;
      training.startCountdown(); 
}

function prepair(head_text,main_text,text_speak, maxRecTime)
{
          timerStop();
     training.isShowPrepare=true;
     training.head=head_text;                                                 
     training.main_text=main_text;//mains.html[1];
      training.isShowNav01=false;
      training.isShowNav02=true;
      training.isShowMain=true;                  
      training.isShowCountdown=false;
      training.micStatus=MicStatus.PREPARE;
    training.progressValue=0;
    training.recTime=0;
    training.maxRecTime=maxRecTime;
    training.rec_nav_text='Готов';
    startPrepairTimer(90);
      //timerStart();   
    /*
     timerStop();
     training.head=head_text;                                                 
     training.main_text=main_text;
      training.isShowNav01=false;
      training.isShowNav02=true;
      training.isShowMain=true;                  
      training.isShowCountdown=false;
      training.micStatus=MicStatus.PREPARE;
      training.maxRecTime=maxRecTime;
      //training.isStartCountdown=true;
      training.startCountdown();     
    */
    /*
    speak(text_speak,()=>{
      timerStart();    
    });
    */
}

function task(head_text,main_text,text_speak,maxRecTime)
{
      timerStop();
      training.head=head_text;
      training.main_text=main_text;
      training.isShowNav01=false;
      training.isShowNav02=true;
      training.isShowMain=true;                  
      training.isShowCountdown=false;
      training.isStartCountdown=false;
    training.isShowPrepare=false;
      training.rec_nav_text='Завершить';
      training.micStatus=MicStatus.RECORDING;

      training.progressValue=0;
      training.maxRecTime=maxRecTime;
      training.recTime=0;
      timerStop();
     speak(text_speak,()=>{
      startRecording();    
    });
      
}
function read_task(head_text,main_text,text_speak,maxRecTime)
{
      timerStop();
     training.head=head_text;                                                 
     training.main_text='';//mains.html[1];
      training.isShowNav01=false;
      training.isShowNav02=true;
      training.isShowMain=false;                  
      training.isShowCountdown=false;
    training.isShowPrepare=false;
      training.micStatus=MicStatus.PREPARE;
    training.progressValue=0;
    training.recTime=0;
    training.maxRecTime=maxRecTime;
    training.rec_nav_text='К заданию';
      timerStart();   
}

