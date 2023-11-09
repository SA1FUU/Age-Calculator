
let container = document.querySelector("#container")
let userContainer = document.querySelector(".user-container")
let userClose = document.querySelector(".user-cross")
let getAge = document.querySelector("#get-age")
let userName = document.getElementById("name")
let error = document.getElementById("error")
let ageInfo = document.querySelector(".age-info")
let ageClose = document.getElementById("age-close")
let user = document.getElementById("user")

function clickAgeBtn() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let birthdate = new Date(document.getElementById("birthdate").value);
    if (birthdate >= today) {
        document.getElementById("date-error").innerText = "*Enter a Valid Date"
    }
    else {
        userContainer.style.visibility = "visible"
        container.style.filter = "blur(15px)"
    }
}

userClose.addEventListener("click", () => {
    userContainer.style.visibility = "hidden"
    container.style.filter = "blur(0)"
    error.textContent = ""
    userName.value = ""
    document.getElementById("date-error").innerText = ""
})

getAge.addEventListener("click", () => {
    if (userName.value === "") {
        error.textContent = "*Please Enter Your Name"
    }
    else {
        calculateAge()
        historyData()
        user.innerText = document.getElementById("name").value
        userContainer.style.visibility = "hidden"
        ageInfo.style.visibility = "visible"
        error.textContent = ""
        userName.value = ""
        document.getElementById("date-error").innerText = ""
    }
})

ageClose.addEventListener("click", () => {
    ageInfo.style.visibility = "hidden"
    container.style.filter = "blur(0)"
    user.innerText = ""

})


function calculateAge() {
    let birthdate = new Date(document.getElementById("birthdate").value);
    let today = new Date();

    // Calculate the difference in years, months, and days
    let yearsDiff = today.getFullYear() - birthdate.getFullYear();
    let monthsDiff = today.getMonth() - birthdate.getMonth();
    let daysDiff = today.getDate() - birthdate.getDate();

    // Adjust for negative months and days differences
    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += 30; // Assuming an average of 30 days per month
    }

    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    let ageText = `${yearsDiff} Years, ${monthsDiff} Months And ${daysDiff} Days Old`;
    document.getElementById("result").textContent = ageText;
}


let listOpenBtn = document.querySelector(".fa-list")
let listCloseBtn = document.querySelector(".fa-x")

listOpenBtn.addEventListener("click", () => {
    document.querySelector(".history-container").classList.add("show")
})

listCloseBtn.addEventListener("click", () => {
    document.querySelector(".history-container").classList.remove("show")
})


function historyData() {
    let birthdate = new Date(document.getElementById("birthdate").value);
    let today = new Date();

    let yearsDiff = today.getFullYear() - birthdate.getFullYear();
    let monthsDiff = today.getMonth() - birthdate.getMonth();
    let daysDiff = today.getDate() - birthdate.getDate();

    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += 30;
    }

    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    let ageText = `${yearsDiff}Y, ${monthsDiff}M, ${daysDiff}D`;

    let historContainer = document.querySelector(".history-container")

    let historyBox = document.createElement("div")
    historyBox.classList.add("history")

    historContainer.appendChild(historyBox)

    let historyName = document.createElement("h4")
    historyName.innerText = userName.value
    historyBox.appendChild(historyName)

    let historyDate = document.createElement("h4")
    historyDate.innerText = ageText
    historyBox.appendChild(historyDate)

    let i = document.createElement("i")
    i.classList.add("fa-solid")
    i.classList.add("fa-trash")

    historyBox.appendChild(i)

    i.addEventListener("click", () => {
        historContainer.removeChild(historyBox)
    })
}