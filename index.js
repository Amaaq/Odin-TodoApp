// Variables for Todo functions
// import {projects,addTodo,addProject,deleteTodo,deleteProject} from './module'

let projects = JSON.parse(localStorage.getItem("projectStorage")) || [new Project("separate",'black')] 
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
let todoFormDiv = document.querySelector("#todo-form")

hideTodoForm()
hideProjectForm()
updateProjects()
showTodos(projects.find((element=>element.name == "separate")).id)
updateOptions()


addTodoDiv.addEventListener("click",(e)=>{
    showTodoForm()
    hideProjectForm()
})
addProjectDiv.addEventListener("click",()=>{
    showProjectForm()
    hideTodoForm()
})

dropTargets.forEach(dropTarget => {
    dropTarget.addEventListener('dragenter', dragEnter)
    dropTarget.addEventListener('dragover', dragOver);
    dropTarget.addEventListener('drop', drop);
});


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
    if(projectForm[0].value == ""){
        projectForm[0].style.borderColor = "red"
    }else {
        addProject(projectForm[0].value,projectForm[1].value)
        projectForm.reset()
        hideProjectForm()
        updateProjects()
        updateOptions()
    }
    
})
todoForm[7].addEventListener("click",(e)=>{
    e.preventDefault()
    if(todoForm[0].value == ""){
        todoForm[0].style.borderColor = "red"
    }else if(todoForm[4].value == "new" && todoForm[5].value == "") {
        todoForm[5].style.borderColor = "red"
    }else {
        if(todoForm[4].value == "new" && todoForm[5].value != ""){
            addProject(todoForm[5].value,todoForm[6].value)
            addTodo(todoForm[0].value,todoForm[3].value!="" ? todoForm[3].value : "NO DESCRIPTION AVAILABLE" ,todoForm[1].value!="" ? todoForm[1].value : "No due Date",todoForm[2].value,todoForm[5].value)
            updateProjects()
            showTodos(projects[projects.length-1].id)
        }else {
            addTodo(todoForm[0].value,todoForm[3].value!="" ? todoForm[3].value : "NO DESCRIPTION AVAILABLE" ,todoForm[1].value!="" ? todoForm[1].value : "No due Date",todoForm[2].value,todoForm[4].value)
            updateProjects()
            showTodos(projects.find((element=>element.name == todoForm[4].value)).id)
        }
        todoForm.reset()
        todoForm[5].disabled = true
        todoForm[6].disabled = true
        hideTodoForm()
        updateOptions()
    }
})


function hideTodoForm(){
    addTodoDiv.style.display = "flex";
    todoForm.parentElement.style.display = "none"
}
function showTodoForm(){
    addTodoDiv.style.display = "none";
    todoForm.parentElement.style.display = "flex"
    todoForm[0].style.borderColor = "var(--btcolor)"
    todoForm[5].style.borderColor = "var(--btcolor)"
    todoForm[0].focus()
}
function hideProjectForm(){
    addProjectDiv.style.display = "flex";
    projectForm.style.display = "none"
}
function showProjectForm(){
    addProjectDiv.style.display = "none";
    projectForm.style.display = "flex"
    projectForm[0].style.borderColor = "var(--btcolor)"
    projectForm[0].focus()
}

function updateProjects() {
    projectsList.textContent = ""
for (let i=0 ; i<projects.length ; i++){
    let li = document.createElement('li')
    let h4 = document.createElement('h4')
    let span = document.createElement('span')
    let icon = document.createElement('i')
    h4.textContent = projects[i].name 
    h4.addEventListener("click",()=>{
        showTodos(projects[i].id)
    })
    span.style.backgroundColor = projects[i].color
    icon.setAttribute("class","fa-solid fa-trash-can")
    icon.addEventListener("click",()=>{
        deleteProject(projects[i].id)
        updateProjects()
        showTodos("separate")
    })
    li.appendChild(span)
    li.appendChild(h4)
    if(projects[i].name!="separate"){li.appendChild(icon)}
    projectsList.appendChild(li)
}
}

function showTodos(id){
    todoStatus.textContent = ""
    inProgress.textContent = ""
    done.textContent = ""
    for(let project of projects){
        if(project.id == id){
            h2.textContent = project.name
            for(let todo of project.todos){

                let li = document.createElement("li")
                let p = document.createElement("p")
                let span = document.createElement("span")
                let del = document.createElement('i')
                let info = document.createElement('i')
                let information = document.createElement('div')
                
                

                li.setAttribute("draggable","true")
                li.addEventListener("dragstart",(e)=>{
                    e.dataTransfer.setData('text',[todo.id,project.id])
                })

                p.textContent = todo.title

                span.textContent = todo.dueDate

                del.setAttribute("class","fa-solid fa-trash-can")
                del.addEventListener("click",()=>{
                    deleteTodo(todo.id)
                    showTodos(id)
                })


                information.textContent = todo.description
                information.setAttribute("class","information")
                info.setAttribute("class","fa-solid fa-circle-info")
                info.addEventListener("click",function(){
                    let informationDivs = document.querySelectorAll(".information");
                    if(information.classList.contains("displayed")){
                        information.classList.remove("displayed")
                    }else {
                        informationDivs.forEach(infoDiv=>{
                            if(infoDiv.classList.contains("displayed")){
                                infoDiv.classList.remove("displayed")
                            }
                        })
                        information.classList.add("displayed")

                    }
                })


                li.appendChild(del)
                li.appendChild(info)
                li.appendChild(p)
                li.appendChild(span)
                li.appendChild(information)
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
        str +=`<option value='${project.name.toLowerCase().replace(" ","-").replace("'",",")}'>${project.name.toUpperCase()}</option>`
    }
    str +='<option value="new" id="new-project">New Project</option>'
    options.innerHTML = str
}

function dragEnter(e) {
    e.preventDefault()
}

function dragOver(e) {
    e.preventDefault()
}

function drop(e) {
    e.preventDefault()
    let arr = e.dataTransfer.getData('text').split(",")
    console.log(arr)
    for(let project of projects){
        if (project.id == Number(arr[1])){
            for(let todo of project.todos){
                if (todo.id == Number(arr[0])){
                    let element = e.target
                    while(element.classList[0] !="drop-target"){
                        element = element.parentElement
                    }
                    todo.status = element.lastElementChild.id;
                }
            }
            showTodos(project.id)
        }
    }
    localStorage.setItem("projectStorage",JSON.stringify(projects))
}

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
    this.projectTitle = projectTitle.toLowerCase();
}


function addProject(name,color){
    projects.push(new Project(name,color))
    localStorage.setItem("projectStorage",JSON.stringify(projects))
}

function deleteProject(id){
    let i=0;
    for (let project of projects){
        if(project.id == id){
            projects.splice(i,1)
        }
        i++
    }
    localStorage.setItem("projectStorage",JSON.stringify(projects))
}

function addTodo(title,description,dueDate,priority,projectTitle){
    for(let project of projects){
        if(project.name == projectTitle.toLowerCase()){
            project.todos.push(new Todo(title,description,dueDate,priority,projectTitle))
        }
    }
    localStorage.setItem("projectStorage",JSON.stringify(projects))
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
    localStorage.setItem("projectStorage",JSON.stringify(projects))
}






