export const topics = [
  {
    name: "Front End Development",
    value: "frontend",
    branches: [
      {
        name: "HTML",
        value: "HTML",
      },
      {
        name: "CSS",
        value: "CSS",
      },
      {
        name: "JavaScript",
        value: "JavaScript",
      },
      {
        name: "AngularJS",
        value: "AngularJS",
      },
      { name: "ReactJS", value: "ReactJS" },
      { name: "VueJS", value: "VueJS" },
      { name: "Web Accessibility", value: "Web Accessibility" },
      { name: "Git", value: "Git" },
    ],
  },
  {
    name: "Back End Development",
    value: "backend",
    img: "../assets/backend.png",
    branches: [
      { name: "NodeJS", value: "NodeJS" },
      { name: "Java", value: "Java" },
      { name: "Hybris", value: "Hybris" },
    ],
  },
  {
    name: "Mobile App Development",
    value: "mobile",
    branches: [
      { name: "Android", value: "Android" },
      { name: "iOS", value: "iOS" },
    ],
  },
  {
    name: "Data Structures",
    value: "datastructures",
    branches: [
      {
        name: "Basic",
        value: "Basic",
      },
      {
        name: "Advanced",
        value: "Advanced",
      },
    ],
  },
  {
    name: "Automation Testing",
    value: "automation",
    branches: [{ name: "Selenium", value: "Selenium" }],
  },
  {
    name: "DevOps",
    value: "devops",
    branches: [
      { name: "Jenkins", value: "Jenkins" },
      { name: "Docker", value: "Docker" },
      { name: "Kubernetes", value: "Kubernetes" },
    ],
  },
];

export const subtopics = [
  { name: "Interview Questions", value: "interview_questions" },
  // {name: 'Boilerplate',value:'boilerplate'},
  // {name: 'Design Architechture',value:'design_arch'},
  // {name: 'Web Components',value:'web_components'}
];

export const levels = [
  { id: "all", name: "All", value: "all", show: false },
  { id: "easy", name: "BTA/Consultant", value: "easy", show: true },
  { id: "medium", name: "Sr Consultant", value: "medium", show: true },
  { id: "hard", name: "Tech Arch", value: "hard", show: true },
];

export const quiz = [
  {
    id: "datastructures",
    name: "Data Structures",
    value: "datastructures",
    desc: "Arrays, Stacks, Queues, etc.",
    img: "/assets/img/datastructures.png",
  },
  {
    id: "html",
    name: "HTML",
    value: "html",
    desc: "Practice Basic to Advanced questions on HTML",
    img: "/assets/img/html.png",
  },
  {
    id: "css",
    name: "CSS",
    value: "css",
    desc: "Practice Basic to Advanced questions on CSS",
    img: "/assets/img/css.png",
  },
  {
    id: "javascript",
    name: "JavaScript",
    value: "javascript",
    desc: "Test your knowledge on JavaScript. ",
    img: "/assets/img/javascript.png",
  },
  {
    id: "react",
    name: "React",
    value: "react",
    desc: "Do you have what it takes to be a React Pro?",
    img: "/assets/img/ract.png",
  },
  {
    id: "angular",
    name: "Angular",
    value: "angular",
    desc: "Well we know that you love Angular, Try out this small quiz",
    img: "/assets/img/angular.png",
  },
  {
    id: "nodejs",
    name: "Node JS",
    value: "nodejs",
    desc: "Brush up your skills on NodeJS",
    img: "/assets/img/nodejs.png",
  },
  {
    id: "",
    name: "Vue JS",
    value: "vue",
    desc: "Test your VUe knowledge",
    img: "/assets/img/vue.png",
  }
];

export const PUSHER_KEY = "c43c5ce3243819bb058e"
export const PUSHER_CLUSTER = 'mt1';



export default {
  topics,
  subtopics,
  quiz,
};
