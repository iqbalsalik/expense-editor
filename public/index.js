const expenseAmount = document.getElementById("expenseAmount");
const expenseDescription = document.getElementById("expenseDescription");
const category = document.getElementById("expenseFields");
const addExpense = document.getElementById("addBtn");
const ul = document.getElementById("list-group");
const updateBtn = document.getElementById("updateBtn");

addExpense.addEventListener("click", postExpense)
//POSTING THE DATA TO DB
async function postExpense(e){
    e.preventDefault();
    try{
        const amount = expenseAmount.value;
        const description = expenseDescription.value;
        const expenseCategory = category.value;
    
        const expenseObj = {
            amount,
            description,
            expenseCategory
        }
        const result = await axios.post("http://localhost:3000/add-expense",{expenseObj})
        console.log(result.data.result)
        showOnScreen(result.data.result,result.data.result.id)
        expenseAmount.value  = '';
        expenseDescription.value = "";
        category.value = "";
    } catch(err){
        document.write(`<h1 style="color: red; margin:10vh 32vw;">${err.response.data.message}</h1>`)
    }
   
}

//GRAB ALL THE DATA FROM DB AND SHOW ON THE SCREEN
window.addEventListener("DOMContentLoaded",async () => {
    try{
        const result = await axios.get("http://localhost:3000/expensetable")
        for (let i = 0; i < result.data.result.length; i++) {
            showOnScreen(result.data.result[i],result.data.result[i].id)
        }
    }catch(err){
        document.write("<h1>Something Went Wrong!</h1>")
    }
})


//SHOW ON THE SCREEN
function showOnScreen(obj,objId){
    const childNode = ` 
            <li class="list-group-item" id = ${objId}>
                ${obj.Amount} ${obj.Description} ${obj.Category}
                <button class="btn btn-primary  btn-sm me-3" type="button" id = "delete" onclick="deleteFromBack('${objId}')">Delete</button>
                <button class="btn btn-primary  btn-sm me-3" type="button" id = "edit" onclick="updateNote('${objId}','${obj.Amount}','${obj.Description}','${obj.Category}')">Edit</button>
            </li>`
            ul.innerHTML+=childNode;
}

//DELETING FROM DB
async function deleteFromBack(objId){
    try{
        await axios.delete(`http://localhost:3000/expenseTable/${objId}`)
        deleteNote(objId)
    }catch(err){
        document.write("<h1>Something Went Wrong!</h1>")
    }

}

//DELETE FROM THE SCREEN
function deleteNote(objId) {
    const child = document.getElementById(objId);
    ul.removeChild(child)
}

//UPDATE NOTE
async function updateNote(objId,objAmount,objDesc,objCat){
   deleteFromBack(objId)
   expenseAmount.value = objAmount;
   expenseDescription.value = objDesc;
   category.value = objCat;
   addExpense.style.display = "none";
   updateBtn.style.display  = "block"
}

//UPDATE BUTTON FUNCTIONALITY
updateBtn.addEventListener("click", postExpense)