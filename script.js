const form=document.getElementById("form");
const recordsContainer=document.getElementById("records-container");
const createButton=document.querySelector("#form button");

let formState="CREATE";
const employeesList=[];
let empId=1000;

const onSubmitForm=(event)=>{
    event.preventDefault();
    const employee={
        name: event.target.name.value,
        employeeId: ++empId,
        salary: event.target.salary.value,
        team: event.target.team.value,
        role: event.target.role.value,
        companyName: event.target.companyName.value

    }
    if(formState==="CREATE"){
        addNewEmployeeRecord(employee);
    }
    else if(formState==="UPDATE"){
        formState="CREATE";
        createButton.innerText="Create Employee";
    }
    form.reset();
    
}

function deleteRecord(event){
    if(formState==="UPDATE"){
        alert("Please Update The Record Before Deleting Anything");
        return;
    }

    const deleteButton=event.target;
    const record=deleteButton.parentNode.parentNode;
    record.remove();

    const currentEmployeeId=parseInt(deleteButton.getAttribute("data-empid"));

    for(let i=0;i<employeesList.length;i++){
        if(employeesList[i].empId===currentEmployeeId){
            employeesList.splice(i,1);
            break;
        }
    }

}

function fillFormWithData(employee){
    for(let key in employee){
        if(key!=="employeeId"){
            form[key].value=employee[key];
        }
    }
    createButton.innerText="Update Employee";
    formState="CREATE"; 
}

function editRecord(event){
    const editButton=event.target;

    const currentEmployeeId=parseInt(editButton.getAttribute("data-empid"));

    for(let i=0;i<employeesList.length;i++){
        if(employeesList[i].employeeId===currentEmployeeId){
            fillFormWithData(employeesList[i]);
            break;
        }
    }
}

function addNewEmployeeRecord(employee){
    const record=document.createElement("tr");
    for(let key in employee){
        const cell=document.createElement("td");
        cell.innerText=employee[key];
        record.appendChild(cell);
    }

    const optionsCell=document.createElement("td");

    const editIcon=document.createElement("span");
    editIcon.className="material-icons icon";
    editIcon.innerText="edit";
    editIcon.setAttribute("data-empId",employee.employeeId);
    editIcon.addEventListener("click",editRecord);

    const deleteIcon=document.createElement("span");
    deleteIcon.className="material-icons icon";
    deleteIcon.innerText="delete";
    deleteIcon.setAttribute("data-empId",employee.employeeId);
    deleteIcon.addEventListener("click",deleteRecord);

    optionsCell.append(editIcon,deleteIcon);
    record.appendChild(optionsCell);

    recordsContainer.appendChild(record);

    employeesList.push(employee);

}

form.addEventListener("submit",onSubmitForm);