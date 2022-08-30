const User = require("../models/users"); 
const { v4: uuidv4 } = require('uuid');

//Retrieve Expenses given an appropriate date 
const retrieveExpenses = async (req, res) => {
    if(res.userData){
        const totals = {
            mainTotal: 0, 
            utilityTotal: 0, 
            entertainmentTotal: 0, 
            foodTotal: 0, 
            housingTotal: 0, 
            transportationTotal: 0, 
            loansTotal: 0, 
            insuranceTotal: 0, 
            otherTotal: 0,
        }; 

    
    for(let i in res.userData.Expenses[req.params.date]){
       totals.mainTotal = totals.mainTotal + parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]);
       if(res.userData.Expenses[req.params.date][i]["Cat"] === "Utilities"){
            totals.utilityTotal = totals.utilityTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]); 
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Entertainment"){
        totals.entertainmentTotal = totals.entertainmentTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]); 
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Food"){
        totals.foodTotal = totals.foodTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]); 
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Housing"){
        totals.housingTotal = totals.housingTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]); 
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Transportation"){
        totals.transportationTotal = totals.transportationTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]);
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Loans/Debts"){
        totals.loansTotal = totals.loansTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]);
       }
       else if(res.userData.Expenses[req.params.date][i]["Cat"] === "Insurance"){
        totals.insuranceTotal = totals.insuranceTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]);
       }
       else{
        totals.otherTotal = totals.otherTotal +  parseFloat(res.userData.Expenses[req.params.date][i]["Amount"]); 
       }
    }
    res.json({main:res.userData.Expenses[req.params.date], totals});
  }
  else{
      res.status(401).end();
  }
   

}
//Adds New Expense
const addExpense = async (req, res) => {
    const id = uuidv4(); 
    if(res.userData){
        req.body.expense.id = id;
       try{
        if(!res.userData.Expenses[req.body.date]){
            res.userData.Expenses[req.body.date] = {}; 
            res.userData.Expenses[req.body.date][id] = req.body.expense;
        }
        else{
            res.userData.Expenses[req.body.date][id] = req.body.expense;
        }
        await User.findByIdAndUpdate(res.userData.id, {Expenses: res.userData.Expenses}).exec();
        res.end();
       }
       catch(err){
           console.log("Error In Adding Expense"); 
           res.status(500).end();
       }
       
       
    }
    else{
        res.status(401).end();
    }
        
    
}

const deleteExpense = async (req, res) => {
    if(res.userData){
        delete res.userData.Expenses[req.body.date][req.body.id]; 
        await User.findByIdAndUpdate(res.userData.id, {Expenses: res.userData.Expenses}).exec();
        res.end();
    }
    else{
        res.status(401).end();
    }
}


const updateExpense = async(req, res) => {
    if(res.userData){
        try{
            res.userData.Expenses[req.body.date][req.body.id] = req.body.expense
            await User.findByIdAndUpdate(res.userData.id, {Expenses: res.userData.Expenses}).exec();
            res.end();
        }
        catch{
            console.log("Error in Updating Expense");
            res.status(500).end();
        }
       
    }
    else{
        res.status(401).end();
    }
}


module.exports = {addExpense, retrieveExpenses, deleteExpense, updateExpense}; 