let Task1 =
{
  task1:
  {
    header: 'Task 1. Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.',
    text: 'Critical thinking has a long tradition in both psychological and educational research, but with different emphases. There is cross-disciplinary agreement on defining Critical Thinking as the ability to evaluate the content of information and to derive conclusions about the extent to which one can believe this information or discuss what one should think of it. Especially against the background of the increasing information density of the past three decades - since the breakthrough of the World Wide Web - the various Internet search engines and now developed chatbots - Critical Thinking is to be considered a key competence in university teaching. The promotion of Critical Thinking is one of the central educational tasks and is identified as a target category in the European Qualifications Framework for Lifelong Learning.'
  },
  task2:
  {
    header1: "Task 2. Study the advertisement.",
    header2: "Welcome to Virtual Reality club!",
    header3: "You are considering visiting a computer club and now you'd like to get more information. In 1.5 minutes you are to ask four direct questions to find out about the following:",
    image: 'tasks/1/1-virtual.jpg',
    text1: '1)	location<br>2) variety of games<br>3)	opening hours       <br>4)	price per hour',
    text2: '<br><strong>You have 20 seconds to ask each question.</strong>',
    questions: ['location', 'variety of games', 'opening hours', 'price per hour']
  },
  task3:
  {
    header: 'Task 3. You are going to give an interview. You have to answer five questions. Give full answers to the questions (2-3 sentences). Remember that you have 40 seconds to answer each question.',
    introduction: "Task 3. You are going to give an interview. You have to answer five questions. Give full answers to the questions (2-3 sentences). Remember that you have 40 seconds to answer each question.",
    introduction1: "Hello everyone! It's the Teenagers Round the World Channel. Our guest today is a teenager from Russia and we are going to discuss gadgets.",
    introduction2: "We'd like to know our guest's point of view on this issue. Please answer five questions. So, let's get started",
    interviewer: ["When was the last time you used a gadget? What for?", "What is the most popular gadget among teenagers in your region and why?", "How have technology and gadgets changed the way teenagers learn?", "Is it important to limit gadgets usage? Why/ why not?", "How will technology affect society in the future?", "Thank you very much for your interview."]
  },
  task4:
  {
    header: 'Task 4. Imagine that you and your friend are doing a school project "Modern inventions". You have found some photos to illustrate it but for technical reasons you cannot send them now. Leave a voice message to your friend explaining your choice of the photos and sharing some ideas about the project. In 2.5 minutes be ready to:',
    text: "• explain the choice of the illustrations for the project by briefly describing them and noting the differences;<br>• mention the advantages (1-2) of the two types of modern inventions;<br> • mention the disadvantages (1-2) of the two types of modern inventions;<br>• express your opinion on the subject of the project — which modern invention you'd prefer and why.",
    images: ['tasks/1/2-1.jpg', 'tasks/1/2-2.jpg'],
    text2: "<strong>You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.</strong>"
  },
  filename: 'tasks/1/task1.pdf'

}

let Task2 =
{
  task1:
  {
    header: 'Task 1. Imagine that you are preparing a project with your friend. You have found some interesting material for the presentation, and you want to read this text to your friend. You have 1.5 minutes to read the text silently, then be ready to read it out aloud. You will not have more than 1.5 minutes to read it.',
    text: 'What do you do to unwind? Presumably something you like doing. And that’s what leisure is (literally—it comes from Old French, meaning to enjoy oneself). But do we really enjoy our free time? On average, in Western society, we get about 5 hours of leisure time a day. That is plenty of time to get involved in all sorts of things—but instead, most of us spend that time watching TV. In a 294-person study from the University of Maryland, those with positive attitudes towards leisure activities, as well as active engagement generally feel healthier, and are more motivated to succeed. In short, we need to take a more active approach to our leisure time. And there are so many options—choice between an ever-growing number of leisure activities. So next time you’ve got some free time, take some time to think about what you’re doing, and why.'

  },
  task2:
  {
    header1: "Task 2. Study the advertisement.",
    header2: "",
    header3: "You are considering joining Zibby's Virtual Book Club and now you’d like to get more information. In 1.5 minutes you are to ask four direct questions to find out about the following:",
    image: 'tasks/2/1-ZibbysBookClub.jpg',
    text1: '1) membership fee<br>2)	frequency of online meetings<br>3)	duration of group discussions;<br>4)	if members receive discussion guides',
    text2: '<br><strong>You have 20 seconds to ask each question.</strong>',
    questions: ['membership fee', 'frequency of online meetings', 'duration of group discussions', 'if members receive discussion guides']
  },
  task3:
  {
    header: 'Task 3. You are going to give an interview. You have to answer five questions. Give full answers to the questions (2-3 sentences). Remember that you have 40 seconds to answer each question.',
    introduction: "Task 3. Hello everybody! It’s Teenagers Round the World Channel. Our guest today is a teenager from Russia and we are going to discuss teenagers’ attitude to cultural activities. We’d like to know our guest’s point of view on this issue. Please answer five questions. So, let’s get started.",
    introduction1: "Hello everybody! It’s Teenagers Round the World Channel. Our guest today is a teenager from Russia and we are going to discuss teenagers’ attitude to cultural activities.",
    introduction2: "We’d like to know our guest’s point of view on this issue. Please answer five questions. So, let’s get started.",
    interviewer: ["Is visiting museums or art galleries popular with Russian teenagers? ", "What cultural activities do you and your friends enjoy? Why do you like them?", "How often do you watch films? Which genre of films do you prefer watching?", "Do you think that joining an English film club is useful for improving your language skills? Why?", "How can we make teenagers be more interested in culture?"]
  },
  task4:
  {
    header: 'Task 4. Imagine that you and your friend are doing a school project “Leisure activities”. You have found some photos to illustrate it but for technical reasons you cannot send them now. Leave a voice message to your friend explaining your choice of the photos and sharing some ideas about the project. In 2.5 minutes be ready to:',
    text: "• explain the choice of the illustrations for the project by briefly describing them and noting the differences;<br> • mention the advantages (1–2) of the two leisure activities;<br>• mention the disadvantages (1–2) of the two leisure activities;<br>express your opinion on the subject of the project – which of the leisure activities presented in the pictures you’d prefer and why.",
    images: ['tasks/2/4-1.jpg', 'tasks/2/4-2.jpg'],
    text2: "<strong>You will speak for not more than 3 minutes (12-15 sentences). You have to talk continuously.</strong>"
  },
  filename: 'tasks/2/task2.pdf'

}

const AllTasks = [0, Task1, Task2]

let Sounds = {
  sound1: 'sounds/sound01.mp3',
  sound2: 'sounds/audio2.mp3',
  sound3: 'sounds/line_open.mp3'
}