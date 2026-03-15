let analyze_contain = document.querySelector(".ana_container");
let MyExpense = JSON.parse(localStorage.getItem("expense"));
const salary = JSON.parse(localStorage.getItem("income"));

let categoryTotal = new Array(9).fill(0);
const cards = {};

for (let i = 0; i < MyExpense.length; i++) {
    const element = MyExpense[i];
    
    if(element.category === "Food"){
        categoryTotal[0] += Number(element.amount);
        let percentage = ((categoryTotal[0] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Food";
        ExpenseCard.Am = categoryTotal[0];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#FF8A00";
        cards.food = ExpenseCard;
    }
    else if(element.category === "Shopping"){
        categoryTotal[1] += Number(element.amount);
        let percentage = ((categoryTotal[1] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Shopping";
        ExpenseCard.Am = categoryTotal[1];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#EC4899";
        cards.shopping = ExpenseCard;
    }
    else if(element.category === "Travel"){
        categoryTotal[2] += Number(element.amount);
        let percentage = ((categoryTotal[2] / salary) * 100).toFixed(1);
        let ExpenseCard = {
            cat : "Travel",
            Am : categoryTotal[2],
            per : percentage,
            color : "#14B8A6"
        };
        cards.travel = ExpenseCard;
    }
    else if(element.category === "Rent/Housing"){
        categoryTotal[3] += Number(element.amount);
        let percentage = ((categoryTotal[3] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Rent/Housing";
        ExpenseCard.Am = categoryTotal[3];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#8B5CF6";
        cards.rent = ExpenseCard;
    }
    else if(element.category === "Utilities"){
        categoryTotal[4] += Number(element.amount);
        let percentage = ((categoryTotal[4] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Utilities";
        ExpenseCard.Am = categoryTotal[4];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#FACC15";
        cards.utilities = ExpenseCard;
    }
    else if(element.category === "Entertainment"){
        categoryTotal[5] += Number(element.amount);
        let percentage = ((categoryTotal[5] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Entertainment";
        ExpenseCard.Am = categoryTotal[5];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#EF4444";
        cards.entertain = ExpenseCard;
    }
    else if(element.category === "Health"){
        categoryTotal[6] += Number(element.amount);
        let percentage = ((categoryTotal[6] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Health";
        ExpenseCard.Am = categoryTotal[6];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#22C55E";
        cards.health = ExpenseCard;
    }
    else if(element.category === "Education"){
        categoryTotal[7] += Number(element.amount);
        let percentage = ((categoryTotal[7] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Education";
        ExpenseCard.Am = categoryTotal[7];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#6366F1";
        cards.education = ExpenseCard;
    }
    else if(element.category === "Other"){
        categoryTotal[8] += Number(element.amount);
        let percentage = ((categoryTotal[8] / salary) * 100).toFixed(1);
        let ExpenseCard = {};
        ExpenseCard.cat = "Other";
        ExpenseCard.Am = categoryTotal[8];
        ExpenseCard.per = percentage;
        ExpenseCard.color = "#6B7280";
        cards.other = ExpenseCard;
    }
}

localStorage.setItem("cards",JSON.stringify(cards));

for (const key in cards) {
    const element = cards[key];
    
    let card = document.createElement("div")
    card.classList.add("category_ex_Card")

    let cat_section = document.createElement("div");
    cat_section.classList.add("cat_main");

    let c_icon = document.createElement("div");
    c_icon.classList.add("cat-icon")

    let font_icon = document.createElement("i")
    switch(element.cat){
        case "Food":
            font_icon.classList.add("fa-solid","fa-utensils","fa-2x");
            break;
        case "Travel":
            font_icon.classList.add("fa-solid","fa-plane");
            break;
        case "Rent/Housing":
            font_icon.classList.add("fa-solid","fa-house");
            break;
        case "Shopping":
            font_icon.classList.add("fa-solid","fa-bag-shopping");
            break;
        case "Utilities":
            font_icon.classList.add("fa-solid","fa-file-invoice-dollar");
            break;
        case "Entertainment":
            font_icon.classList.add("fa-solid","fa-film");
            break;
        case "Education":
            font_icon.classList.add("fa-solid","fa-graduation-cap");
            break;
        case "Health":
            font_icon.classList.add("fa-solid","fa-heart-pulse");
            break;
        case "Other":
            font_icon.classList.add("fa-solid","fa-heart-pulse");
            break;
        default:
            console.error("category not found");
    }
    
    let catName = document.createElement("div");
    catName.classList.add("cat_name");
    catName.textContent = element.cat;

    let ExpenseInfo = document.createElement("div");
    ExpenseInfo.classList.add("Ex_info");
    ExpenseInfo.textContent = `₹${element.Am.toLocaleString("en-IN")}`;

    let progressCon = document.createElement("div");
    progressCon.classList.add("progress_contain")
    let progressBar = document.createElement("div");
    progressBar.classList.add("progressbar");
    progressBar.style.backgroundColor = element.color;
    progressBar.style.width = element.per+"%";

    let progressInfo = document.createElement("div");
    progressInfo.classList.add("progress_info");
    progressInfo.textContent = `${element.per}% of total salary`;

    c_icon.appendChild(font_icon);
    cat_section.appendChild(c_icon);
    cat_section.appendChild(catName);
    progressCon.appendChild(progressBar);

    card.appendChild(cat_section);
    card.appendChild(ExpenseInfo);
    card.appendChild(progressCon);
    card.appendChild(progressInfo);
    analyze_contain.appendChild(card);
}