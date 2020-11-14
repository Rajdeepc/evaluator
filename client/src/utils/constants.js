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
      { name: "ReactJS", value: "ReactJS"},
      { name: "VueJS", value: "VueJS" },
      { name: "Web Accessibility", value: "Web Accessibility"},
      { name: "Git", value: "Git" }
      
    ]
  },
  {
    name: "Back End Development",
    value: "backend",
    img: "../assets/backend.png",
    branches: [
      { name: "NodeJS", value: "NodeJS"},
      { name: "Java", value: "Java"},
      { name: "Hybris", value: "Hybris"},
    ],
  },
  {
    name: "Mobile App Development",
    value: "mobile",
    branches: [
      { name: "Android", value: "Android"},
      { name: "iOS", value: "iOS"},
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
      }
      
    ]
  },
  {
    name: "Automation Testing",
    value: "automation",
    branches: [
      { name: "Selenium", value: "Selenium" }
    ]
  },
  {
    name: "DevOps",
    value: "devops",
    branches: [
      { name: "Jenkins", value: "Jenkins"},
      { name: "Docker", value: "Docker"},
      { name: "Kubernetes", value: "Kubernetes" },
    ]
  }
];

export const subtopics = [
  { name: "Interview Questions", value: "interview_questions" },
  // {name: 'Boilerplate',value:'boilerplate'},
  // {name: 'Design Architechture',value:'design_arch'},
  // {name: 'Web Components',value:'web_components'}
];

export const levels = [
  { id:"all" , name:'All' ,value:'all',show:false},
  { id:"easy" , name:'Consultant' ,value:'easy',show:true},
  { id:"medium" ,name:'Sr Consultant' ,value:'medium',show:true},
  { id:"hard" , name:'Tech Arch' ,value:'hard',show:true}
]

export const quiz = [
  { id:"datastructures" , name:'Data Structures' ,value:'datastructures',desc:'Arrays, Stacks, Queues, etc.'},
  { id:"htmlcss" , name:'HTML/CSS' ,value:'htmlcss',desc:'Practice Basic to Advanced questions on HTML and CSS'},
  { id:"javascript" , name:'JavaScript' ,value:'javascript',desc:'Test your knowledge on JavaScript. '},
  { id:"react" , name:'React' ,value:'react',desc:'Do you have what it takes to be a React Pro?'},
  { id:"angular" , name:'Angular' ,value:'angular',desc:'Well we know that you love Angular, Try out this small quiz'},
  { id:"nodejs" , name:'Node JS' ,value:'nodejs',desc:'Brush up your skills on NodeJS'},
  { id:"python" , name:'Python' ,value:'python',desc:'Getting Started, Working with ..., Object Oriented ..., etc.'},
  { id:"selenium" , name:'Selenium' ,value:'selenium',desc:'Brush up your skills on Selenium'}
]



export default {
  topics,
  subtopics,
  quiz
};
