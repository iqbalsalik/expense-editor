const expenseAmount  = document.getElementById("expenseAmount");
const expenseDescription = document.getElementById("expenseDescription");
const category = document.getElementById("expenseFields");
const addExpense = document.getElementById("addBtn");
const ul = document.getElementById("list-group");

addExpense.addEventListener("click",(e)=>{
    e.preventDefault();

let li = document.createElement("li");
li.className = "list-group-item"
li.textContent = `${category.value}, ${expenseDescription.value},${expenseAmount.value},`
let deletBtn = document.createElement("button");
deletBtn.className = "btn btn-primary btn-sm me-3"
deletBtn.id = "delete"
deletBtn.textContent = "Delete Amount";
let editBtn = document.createElement("button");
editBtn.id = "edit"
editBtn.className = "btn btn-primary btn-sm";
editBtn.textContent = "Edit Amount"
li.appendChild(deletBtn)
li.appendChild(editBtn)
ul.appendChild(li)
let inputValue = [category.value,expenseDescription.value]

localStorage.setItem(expenseAmount.value, inputValue)


expenseDescription.value='';
category.value= "";
expenseAmount.value="";


//settin localStorage

deletBtn.addEventListener("click",deleteNote)

editBtn.onclick= (e)=>{
    if(e.target.id.contains="edit"){
        let targetData = e.target.parentElement.textContent.split(",")
        e.target.parentElement.remove()
        localStorage.removeItem(targetData[2])
        expenseAmount.value = targetData[2];
        expenseDescription.value = targetData[1];
        category.value = targetData[0]
        console.log(targetData)
    }
}



})

function deleteNote(e){
    if(e.target.id.contains="delete"){
        e.target.parentElement.remove()
        localStorage.removeItem(e.target.parentElement.textContent.split(",")[2])
    }
   }