const path = require("path");

const ExpenseList = require("../models/expenseModels");



exports.postAddExpense = async (req, res) => {
    try{
        const Amount = req.body.expenseObj.amount;
        const Description = req.body.expenseObj.description;
        const Category = req.body.expenseObj.expenseCategory;

        if(!Amount || !Description || !Category){
           return res.status(400).json({
                message:"All The feilds are mandatory!!"
            })
        }
    
        const result = await ExpenseList.create({ Amount, Description, Category });
        res.status(200).json({
            result: result
        })
    } catch(err){
        res.status(500).json({message:"Something went wrong!"})
    }
}

exports.getExpenseData = async (req, res) => {
    try{
        const result = await ExpenseList.findAll();
        res.status(200).json({ result: result })
    } catch(err){
        res.status(500).json({message:"Something went wrong!"})
    }
}


exports.getExpenseForm = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
}

exports.deleteData = async (req, res) => {
    try{
        const exId = req.params.expenseId;
        const toDeleteExpense = await ExpenseList.findByPk(exId);
        await toDeleteExpense.destroy();
    
        res.status(200).json({ message: "Successfully Deleted" })
    } catch(err){
        res.status(500).json({message:"Something went wrong!"})
    } 
}

exports.updateTable =  async (req,res)=>{
    if(!req.body.Amount || !req.body.Description || !req.body.Category){
        return res.status(400).json({
            message:"All The feilds are mandatory!!"
        }) 
    }
    try{
        const objId = req.params.objId;
        ExpenseList.update({
            Amount:req.body.Amount,
            Description:req.body.Description,
            Category:req.body.Category
        },{
            where:{
                id:objId
            }
        })
        res.status(200).json("Successfully Updated")
    } catch (err){
        res.status(500).json({message:"Something went wrong!"})
    }  
}