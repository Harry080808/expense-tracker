const userIncome = document.querySelector("#user_income");
const totalEx = document.querySelector("#total_amount");
const donutInfo = document.querySelector("#chart_expense")
const savingsDisplay = document.querySelector("#savings_amount")
const topSpentCat = document.querySelector("#spend_cat")
const HighEx = document.querySelector("#HighEx_amount")
const pieChart = document.querySelector(".pie_chart");

let cards = JSON.parse(localStorage.getItem("cards"))
let Income = Number(localStorage.getItem("income"))
userIncome.textContent = `₹${Income.toLocaleString("en-IN")}`;

let expenses = JSON.parse(localStorage.getItem("expense")) || [];

if(!Income && expenses.length === 0){
    showErrorPage();
}
let totalExpense = 0;
let topSpentAmt = 0;
let topCat = "";
let topCatColor = "";

// calculate total amount
for(let i=0; i<expenses.length; i++){
    let expense = expenses[i];
    totalExpense += Number(expense.amount);
}

for (const key in cards) {
    const element = cards[key];
    
    if(element.Am > topSpentAmt){
        topSpentAmt = element.Am;
        topCat = element.cat;
        topCatColor = element.color;
    }
}

let percenArr = [];
// calculate savings using salary and expense
let savings = Income - totalExpense;
donutInfo.textContent = `₹${totalExpense.toLocaleString("en-IN")}`;
totalEx.textContent = `₹${totalExpense.toLocaleString("en-IN")}`;
savingsDisplay.textContent = `₹${savings.toLocaleString("en-IN")}`;
topSpentCat.textContent = topCat;
topSpentCat.style.color = topCatColor;
HighEx.textContent = `₹${topSpentAmt.toLocaleString("en-IN")}`
let index = 0;
for(let key in cards){

    let element = cards[key];

    let per = Math.round((element.Am / totalExpense) * 100);
    percenArr[index++] = {
        catColor:element.color,
        catPer:per,
        catName:element.cat
    }
}

percenArr.sort((a,b) => a.catPer - b.catPer);

let gradient = "";
let increasePer = 0;

for(let i = 0; i < percenArr.length; i++){
    let donutCard = percenArr[i];
    let end = increasePer + donutCard.catPer;

    gradient += `${donutCard.catColor} ${increasePer}% ${end}%`;

    if(i !== percenArr.length - 1){
        gradient += ", ";
    }

    increasePer = end;
}

pieChart.style.background = `conic-gradient(${gradient})`;
const ChartDesc = document.querySelector(".chart_desc");

for(let i = 0; i < percenArr.length; i++){
    let donut = percenArr[i];

    let DescContain = document.createElement("div");
    DescContain.classList.add("desc_container");

    let CatCol = document.createElement("div");
    CatCol.setAttribute("id","Food_cat");

    let CatDesc = document.createElement("div");
    CatDesc.classList.add("category_desc");

    CatCol.style.backgroundColor = donut.catColor;
    CatDesc.textContent = `${donut.catName} (${donut.catPer}%)`

    DescContain.appendChild(CatCol)
    DescContain.appendChild(CatDesc)
    ChartDesc.appendChild(DescContain);
}
let table = document.querySelector("table")
expenses.map((element,i) =>{
    let Tr = document.createElement("tr");
    let tdC = document.createElement("td")
    let tdT = document.createElement("td")
    let tdD = document.createElement("td")
    let tdA = document.createElement("td")
    let tdDelete = document.createElement("td")
    let DeleteIcon = document.createElement("i")
    let DeleteButton = document.createElement("button");

    let options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };
    tdD.textContent = new Date(element.date).toLocaleDateString("en-IN", options);

    tdC.textContent = element.category;
    tdT.textContent = element.title;
    let E_amount = Number(element.amount);
    tdA.textContent = `₹${E_amount.toLocaleString("en-IN")}`;
    DeleteIcon.classList.add("fa-sharp","fa-solid","fa-trash-can")
    Tr.style.borderBottom = "1px solid #1E293B";
    DeleteButton.dataset.index = i;
    DeleteButton.addEventListener("click",function(event){
        let index= event.currentTarget.dataset.index;
        let NewEx = expenses.filter((_,i) => i != index);
        localStorage.setItem("expense",JSON.stringify(NewEx));
        location.reload();
    })
    DeleteButton.appendChild(DeleteIcon);
    tdDelete.appendChild(DeleteButton);
    Tr.appendChild(tdC);
    Tr.appendChild(tdT);
    Tr.appendChild(tdD);
    Tr.appendChild(tdA);
    Tr.appendChild(tdDelete);
    table.appendChild(Tr)
})

function showErrorPage(){
    const dashboard = document.querySelector(".main_contain");
    const errorPage = document.querySelector("#errorPage");

    dashboard.style.display = "none"
    errorPage.style.display = "flex";

    return;
}