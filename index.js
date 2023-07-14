// Variables for Todo functions
// import {projects,addTodo,addProject,deleteTodo,deleteProject} from './module'
let projects = [new Project("separate",'black')]
//Variables for Dom Manupilation
let todoStatus = document.querySelector('#to-do')
let inProgress = document.querySelector('#in-progress')
let done = document.querySelector('#done')
let h2 = document.querySelector("h2")
let projectsList = document.querySelector("#projects")
let options = document.querySelector("#options")
let addTodoDiv = document.querySelector(".add-todo-div")
let addProjectDiv = document.querySelector(".add-project-div")
let projectForm = document.forms[0] 
let todoForm = document.forms[1] 
let dropTargets = document.querySelectorAll(".drop-target")

dropTargets.forEach(dropTarget => {
    dropTarget.addEventListener('dragenter', dragEnter,true)
    dropTarget.addEventListener('dragover', dragOver,true);
    dropTarget.addEventListener('dragleave', dragLeave,true);
    dropTarget.addEventListener('drop', drop,true);
});

function dragEnter(e) {
    e.preventDefault()
}

function dragOver(e) {
    e.preventDefault()
}

function dragLeave(e) {
}

function drop(e) {
    e.preventDefault()
    e.stopPropagation()
    let arr = e.dataTransfer.getData('text').split(",")
    for(let project of projects){
        if (project.name == arr[1]){
            for(let todo of project.todos){
                if (todo.id == Number(arr[0])){
                    todo.status = e.target.lastElementChild.id
                }
            }
            showTodos(project.name)
        }
    }
}
hideTodoForm()
hideProjectForm()
updateProjects()
showTodos("separate")
todoForm[4].addEventListener("change",(e)=>{
    if(e.currentTarget.value == "new"){
        todoForm[5].disabled = false
        todoForm[6].disabled = false
    }else{
        todoForm[5].disabled = true
        todoForm[6].disabled = true
    }
});
todoForm[8].addEventListener("click",hideTodoForm)

projectForm[3].addEventListener("click",hideProjectForm)

projectForm[2].addEventListener("click",(e)=>{
    e.preventDefault()
    addProject(projectForm[0].value,projectForm[1].value)
    hideProjectForm()
    updateProjects()
    updateOptions()
    
})
todoForm[7].addEventListener("click",(e)=>{
    e.preventDefault()
    if(todoForm[4].value == "new" && todoForm[5].value != ""){
        addProject(todoForm[5].value,todoForm[6].value)
        addTodo(todoForm[0].value,todoForm[3].value,todoForm[1].value,todoForm[2].value,todoForm[5].value)
        updateProjects()
        showTodos(todoForm[5].value.toLowerCase())
    }else {
        addTodo(todoForm[0].value,todoForm[3].value,todoForm[1].value,todoForm[2].value,todoForm[4].value)
        updateProjects()
        showTodos(todoForm[4].value.toLowerCase())
    }
    todoForm.reset()
    todoForm[5].disabled = true
    todoForm[6].disabled = true
    hideTodoForm()
    updateOptions()
})


function hideTodoForm(){
    addTodoDiv.style.display = "flex";
    todoForm.parentElement.style.display = "none"
}
function showTodoForm(){
    addTodoDiv.style.display = "none";
    todoForm.parentElement.style.display = "flex"
}
function hideProjectForm(){
    addProjectDiv.style.display = "flex";
    projectForm.style.display = "none"
}
function showProjectForm(){
    addProjectDiv.style.display = "none";
    projectForm.style.display = "flex"
}
addTodoDiv.addEventListener("click",(e)=>{
    showTodoForm()
    hideProjectForm()
})
addProjectDiv.addEventListener("click",()=>{
    showProjectForm()
    hideTodoForm()
})

function updateProjects() {
    projectsList.textContent = ""
for (let i=0 ; i<projects.length ; i++){
    let li = document.createElement('li')
    let h4 = document.createElement('h4')
    let span = document.createElement('span')
    let icon = document.createElement('i')
    h4.textContent = projects[i].name 
    h4.addEventListener("click",()=>{
        showTodos(projects[i].name)
    })
    span.style.backgroundColor = projects[i].color
    icon.setAttribute("class","fa-solid fa-trash-can")
    icon.addEventListener("click",()=>{
        deleteProject(projects[i].name)
        updateProjects()
        showTodos("separate")
    })
    li.appendChild(span)
    li.appendChild(h4)
    if(projects[i].name!="separate"){li.appendChild(icon)}
    projectsList.appendChild(li)
}
}

function showTodos(name){
    h2.textContent = name
    todoStatus.textContent = ""
    inProgress.textContent = ""
    done.textContent = ""
    for(let project of projects){
        if(project.name == name){
            for(let todo of project.todos){
                let li = document.createElement("li")
                li.setAttribute("draggable","true")
                li.addEventListener("dragstart",(e)=>{
                    e.dataTransfer.setData('text',[todo.id,project.name])
                })
                let p = document.createElement("p")
                let span = document.createElement("span")
                let icon = document.createElement('i')
                p.textContent = todo.title
                span.textContent = todo.dueDate
                icon.setAttribute("class","fa-solid fa-trash-can")
                icon.addEventListener("click",()=>{
                    deleteTodo(todo.id)
                    showTodos(name)
                })
                li.appendChild(p)
                li.appendChild(span)
                li.appendChild(icon)
                switch (todo.status){
                    case "to-do" : {
                        todoStatus.appendChild(li);
                        break;
                    }
                    case "in-progress" : {
                        inProgress.appendChild(li); 
                        break;
                    }
                    case "done" : {
                        done.appendChild(li); 
                        break;
                    }
                }
            }
        }
    }
}

function updateOptions(){
    let str = ""
    for(let project of projects){
        str +=`<option value='${project.name.toLowerCase().replace(" ","-")}'>${project.name.toUpperCase()}</option>`
    }
    str +='<option value="new" id="new-project">New Project</option>'
    options.innerHTML = str
}

function Project(name,color){
    this.name = name;
    this.color = color;
    this.todos = []
}
function Todo(title,description,dueDate,priority,projectTitle){
    this.id = Date.now()
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "to-do";
    this.projectTitle = projectTitle;
}


function addProject(name,color){
    projects.push(new Project(name,color))
}

function deleteProject(name){
    let i=0;
    for (let project of projects){
        if(project.name == name){
            projects.splice(i,1)
        }
        i++
    }
}

function addTodo(title,description,dueDate,priority,projectTitle){
    for(let project of projects){
        if(project.name == projectTitle){
            project.todos.push(new Todo(title,description,dueDate,priority,projectTitle))
        }
    }
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






