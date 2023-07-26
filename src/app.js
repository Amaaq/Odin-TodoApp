import { getAuth } from 'firebase/auth'
export {db,auth,projects,addTodo,addProject,deleteTodo,deleteProject}
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { updateDataBase} from './index'



const firebaseConfig = {
    apiKey: "AIzaSyCYNaTdvRzTxmDMZlc_Qrl95ULlsYcPX9k",
    authDomain: "todoappadil.firebaseapp.com",
    projectId: "todoappadil",
    storageBucket: "todoappadil.appspot.com",
    messagingSenderId: "343612051830",
    appId: "1:343612051830:web:40c5b6752b92d248ca6a57"
  };
  const app = initializeApp(firebaseConfig);
  let auth = getAuth()
  const db = getFirestore(app);
  let projects = [new Project("separate","black")]



function Project(name,color){
    this.id = Date.now()
    this.name = name.toLowerCase();
    this.color = color;
    this.todos = []
}
function Todo(title,description,dueDate,priority,projectTitle){
    this.id = Date.now()
    this.title = title.toLowerCase();
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "to-do";
    this.projectTitle = projectTitle.toLowerCase().replace('-',' ');
}


function addProject(name,color){
    projects.push(new Project(name,color))
    updateDataBase()

}

function deleteProject(id){
    let i=0;
    for (let project of projects){
        if(project.id == id){
            projects.splice(i,1)
        }
        i++
    }
    updateDataBase()
}

function addTodo(title,description,dueDate,priority,projectTitle){
    for(let project of projects){
        if(project.name == projectTitle.toLowerCase().replace('-',' ')){
            project.todos.push(new Todo(title,description,dueDate,priority,projectTitle))
        }
    }
    updateDataBase()
}
function deleteTodo(id){
    for(let project of projects){
        let i=0
        for(let todo of project.todos){
            if(todo.id == id){
                project.todos.splice(i,1)
            }
            i++
        }
    }
}