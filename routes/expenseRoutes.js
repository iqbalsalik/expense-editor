const express = require("express")

const expenseController = require("../controler/expenseControler")

const router = express.Router()

router.post("/add-expense",expenseController.postAddExpense);

router.get("/expensetable", expenseController.getExpenseData);

router.delete("/expensetable/:expenseId",expenseController.deleteData)

 router.get("/",expenseController.getExpenseForm);


 module.exports = router

