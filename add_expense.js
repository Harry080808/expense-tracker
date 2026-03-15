const categories = document.querySelector("select");
const form = document.querySelector("form");
const inputsUsers = document.querySelectorAll("input");
const cat_error = document.querySelector("#categoryError");
const amountError = document.querySelector("#amountError")
const titleErr = document.querySelector("#titleError")
const dateErr = document.querySelector("#dateError");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if(categories.value === ""){
        cat_error.style.display = "initial";
    }
    else{
        cat_error.style.display = "none";
    }
    if(inputsUsers[0].value === ""){
        amountError.style.display = "initial";
    }
    else{
        amountError.style.display = "none";
    }
    if(inputsUsers[1].value === ""){
        titleErr.style.display = "initial";
    }
    else{
        titleErr.style.display = "none";
    }
    if(inputsUsers[2].value === ""){
        dateErr.style.display = "initial";
    }
    else{
        dateErr.style.display = "none";
    }

    let isFilled = true;
    inputsUsers.forEach(function(inp){
        if(inp.value === ""){
            isFilled = false;
        }
    })

    if(isFilled === false){
        Toastify({
            text: "Fields are empty. Please fill the form",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                borderRadius: "8px"
            },
            backgroundColor: "#ef4444"
        }).showToast();
        return;
    }

    const UserExpense = {
        category: categories.value,
        amount: inputsUsers[0].value,
        title: inputsUsers[1].value,
        date: inputsUsers[2].value
    };

    let expenses = JSON.parse(localStorage.getItem("expense") || "[]");

    expenses.push(UserExpense);

    localStorage.setItem("expense", JSON.stringify(expenses));

    inputsUsers.forEach(input => input.value = "");
    categories.value = "";

    inputsUsers.forEach(input => input.value = "");
    categories.value = "Select";

    Toastify({
        text: "Expense added successfully",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#22c55e"
    }).showToast();
});