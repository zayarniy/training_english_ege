const MicStatus= {NOTREADY:0,READYTORECORD:1,RECORDING:2,READYTOPLAY:3,PLAY:4}
let headers=['Подготовка','Task 1. Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.', "Task 2. Study the advertisement.<br>Welcome to Virtual Reality club!<br>You are considering visiting a computer club and now you'd like to get more information. In 1.5 minutes you are to ask four direct questions to find out about the following:"]
let mains={html:['Внимание.<br>На следующем этапе тренажёр попытается получить доступ к микрофону.У Вас появится запрос на использование сайтом микрофона.<br>Если вы планируете использовать функцию записи, то разрешите сайту использовать микрофон.','Critical thinking has a long tradition in both psychological and educational research, but with different emphases. There is cross-disciplinary agreement on defining Critical Thinking as the ability to evaluate the content of information and to derive conclusions about the extent to which one can believe this information or discuss what one should think of it. Especially against the background of the increasing information density of the past three decades - since the breakthrough of the World Wide Web - the various Internet search engines and now developed chatbots - Critical Thinking is to be considered a key competence in university teaching. The promotion of Critical Thinking is one of the central educational tasks and is identified as a target category in the European Qualifications Framework for Lifelong Learning. In this respect, Critical Thinking not only subsumes individual competencies such as problem-solving competence and decision-making, but also combines them through their further development into reflective competence. Reflective competence thus is elementary for Critical Thinking because it continuously reviews or questions existing norms, values and quality criteria in the sciences, but also in the organizational academic context.','1)	location       Where is your computer club located?<br>2)	variety of games      What games can I play there?<br>3)	opening hours       What are the opening hours of your computer club?<br>4)	price per hour         What is the price per hour?'],images:['1px.jpg','1px.jpg','1-virtual.jpg']}
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
                  micStatus:MicStatus.NOTREADY,
                  recTime:0,
                  progressValue:0,
                  maxRecTime:10,
                  rec_nav_text:'Перейти к экзамену',
                  //isCountdown: true,
                  countDown: 10,
                  level:1
                }    
        function timerStart()
        {
            timer=setInterval(
                ()=>
                {
                    if (training.recTime<training.maxRecTime)
                    {
                        training.recTime++;
                        training.progressValue+=training.progressStep;
                    }
                     
                    else
                        timerStop();
                },1000);
        }

        function timerStop()
        {
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
                                    this.Level(this.level);
                                }
                                }, 1000);
                                }
                             },
                                 Level(n)
                                {
                                    n=this.level++;
                                    console.log('Level:'+n)
                                    switch(n)
                                        {
                                            case 1:
                                                  training.head=headers[0];
                                                  training.main_text=mains.html[0];
                                                  training.isShowNav01=false;
                                                  training.isShowNav02=true;
                                                  training.isShowMain=true;                  
                                                  training.isShowCountdown=false;
                                                  //micStatus:MicStatus.NOTREADY,
                                                  //recTime:0,
                                                  //progressValue:0,
                                                  //maxRecTime:10,
                                                  //isCountdown: true,
                                                  //countdown: 10   
                                            break;
                                          case 2:
                                          case 4:        
                                                  training.head='';
                                                  training.main_text='';
                                                  training.isShowNav01=false;
                                                  training.isShowNav02=false;
                                                  training.isShowMain=false;                  
                                                  training.isShowCountdown=true;
                                                  training.countDown=10;
                                                  training.isStartCountdown=true;
                                                  training.startCountdown(); 
                                            break;   
                                            case 3:
                                                  training.head=headers[1];
                                                  training.main_text=mains.html[1];
                                                  training.isShowNav01=false;
                                                  training.isShowNav02=true;
                                                  training.isShowMain=true;                  
                                                  training.isShowCountdown=false;
                                                  training.isStartCountdown=false;
                                                  training.rec_nav_text='Завершить';
                                                  training.micStatus=MicStatus.READYTORECORD;
                                                  training.progressValue=0;
                                                  training.maxRecTime=90;
                                                  //training.startCountdown();
                                                  //micStatus:MicStatus.NOTREADY,
                                                  //recTime:0,
                                                  //progressValue:0,
                                                  //maxRecTime:10,
                                                  //isCountdown: true,
                                                  //countdown: 10                                                   
                                            break;    
                                            case 5:
                                                  training.head=headers[2];
                                                  training.main_text=mains.html[2];
                                                  training.image=mains.images[2];
                                                  training.isShowNav01=false;
                                                  training.isShowNav02=true;
                                                  training.isShowMain=true;                  
                                                  training.isShowCountdown=false;
                                                  training.isStartCountdown=false;
                                                  training.rec_nav_text='Завершить';
                                                  training.micStatus=MicStatus.READYTORECORD;
                                                  training.progressValue=0;
                                                  training.maxRecTime=90;
                                                  //training.startCountdown();
                                                  //micStatus:MicStatus.NOTREADY,
                                                  //recTime:0,
                                                  //progressValue:0,
                                                  //maxRecTime:10,
                                                  //isCountdown: true,
                                                  //countdown: 10                                                   
                                            break;    
                                                

                                        }
                                }                                 
                             }
                             });





