

export {projects,addTodo,addProject,deleteTodo,deleteProject}




let projects = JSON.parse(localStorage.getItem("projectStorage")) || [new Project("separate",'black')] 


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