var expensecost = 0;
let totalexpenseamount = document.querySelector(".totalexpenseamount")
let budgetmoney = document.querySelector(".budgetmoney")
let totalbalanceleft = document.querySelector(".totalbalanceleft")
let storage = JSON.parse(localStorage.getItem('expense')) || [];


function adtotalcost(){
    const savedTodo = JSON.parse(localStorage.getItem('expense')) || [];
savedTodo.forEach((data)=>{
    expensecost += +data.productscost;  
    totalexpenseamount.innerHTML = expensecost
    // console.log(expensecost);
    let balance =  +budgetmoney.textContent - +totalexpenseamount.textContent;
    totalbalanceleft.innerHTML = balance
    console.log(balance);
})
}

document.querySelector(".budgetbtn").addEventListener("click",function(){
 let budgetmoney = document.querySelector(".budgetmoney");   
    let budgetinput = document.querySelector(".budgetinput").value;
    if(budgetinput){
    const savedTodos = JSON.parse(localStorage.getItem('budget')) || [];
    const todo = { totalbudgetamount: budgetinput };
    savedTodos.push(todo);
    localStorage.setItem('budget', JSON.stringify(savedTodos));
    savedTodos.forEach(element => {
        budgetmoney.innerHTML = element.totalbudgetamount;
    });
    location.reload();}
else{
    alert("please enter your budget")
}
    // console.log(budgetinput);
})

window.onload = onReload;
function onReload() {
    const savedTodo = JSON.parse(localStorage.getItem('budget')) || [];
    let budgetmoney = document.querySelector(".budgetmoney");   
    savedTodo.forEach(element => {
        budgetmoney.innerHTML = element.totalbudgetamount;
    });
let expenselist = document.querySelector(".expenselistt")

expenselist.innerHTML = "";
const savedTodos = JSON.parse(localStorage.getItem('expense')) || [];
savedTodos.forEach(element => {
    let div = document.createElement("div")
    div.classList.add("expenselist")
let expenseelement = `<p class="name">${element.productsname}</p>
<p class="amount">${element.productscost}</p>
<button class = "edited bn">Edit</button>
<button class ="delete bn">Delete</button>`
div.innerHTML = expenseelement;
    expenselist.appendChild(div);

});
adtotalcost()
}


document.querySelector(".checkamountbtn").addEventListener("click",function(){
    let productname = document.querySelector(".productname").value;
    let produccost = document.querySelector(".produccost").value;
let expenselist = document.querySelector(".expenselistt")
    if(productname){
if(produccost){
    expenselist.innerHTML = "";
    const savedTodos = JSON.parse(localStorage.getItem('expense')) || [];
    const todo = {productsname:productname, productscost: produccost };
    savedTodos.push(todo);
    localStorage.setItem('expense', JSON.stringify(savedTodos));

    savedTodos.forEach(element => {
        let div = document.createElement("div")
        div.classList.add("expenselist")
let expenseelement = `<p class="name">${element.productsname}</p>
    <p class="amount">${element.productscost}</p>
    <button class = "edited bn">Edit</button>
    <button class ="delete bn">Delete</button>`
div.innerHTML = expenseelement;
        expenselist.appendChild(div);
        
        

    });
    adtotalcost();
    location.reload()
}
else{alert("enter product cost")}  
}
    else{alert("enter product name")}
})

document.querySelector(".expenselistt").addEventListener("click",function(e){

    if(e.target.classList.contains("delete")){

        const li = e.target.parentElement;
        const index = Array.from(e.target.parentElement.parentElement.children).indexOf(li);
        console.log(index);
        console.log(li);
        storage.splice(index, 1);
        localStorage.setItem('expense', JSON.stringify(storage));
        console.log(e.target.parentElement.remove()); 
        location.reload();
    }
    else if(e.target.classList.contains("edited")){
        console.log("edited");
        let productname = prompt("enter productname")
        let produccost = prompt("enter produccost")
        const object = {productsname:productname, productscost: produccost };
        const li = e.target.parentElement;
        const index = Array.from(e.target.parentElement.parentElement.children).indexOf(li);
        console.log(index);
        console.log(li);
        storage.splice(index, 1,object);
        localStorage.setItem('expense', JSON.stringify(storage));
        location.reload();
    }

})