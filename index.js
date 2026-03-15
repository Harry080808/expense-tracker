let form = document.querySelector("form");
let inputs = document.querySelector("input");

form.addEventListener("submit", function(dets){
    dets.preventDefault();

    if(inputs.value === ""){
        Toastify({
            text: "Please fill income before submitting",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ef4444"
        }).showToast();
        return;
    }

    let income = inputs.value;

    Toastify({
        text: "Income saved successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#22c55e"
    }).showToast();

    localStorage.setItem("income", income);

    inputs.value = "";
});