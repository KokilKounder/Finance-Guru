
const express = require("express"); 
const { route } = require("./loginRoutes");
const router = express.Router();
const {requireAuth} = require("../middleware/requireAuth");
const {addExpense, retrieveExpenses, deleteExpense, updateExpense} = require("../controllers/expenseControllers")
//Controller Import Goes Here

// Get All Expenses a User has made for a specific Date 
router.get("/retrieve/:date", requireAuth, retrieveExpenses);

//Add an Expense to a Specific Date,
router.post("/add", requireAuth, addExpense);

router.put("/update", requireAuth, updateExpense)

router.delete("/remove", requireAuth, deleteExpense);

module.exports = router;