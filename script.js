
let container = document.querySelector("#container")
let userContainer = document.querySelector(".user-container")
let userClose = document.querySelector(".user-cross")
let getAge = document.querySelector("#get-age")
let userName = document.getElementById("name")
let error = document.getElementById("error")
let ageInfo = document.querySelector(".age-info")
let ageClose = document.getElementById("age-close")
let user = document.getElementById("user")
let loader = document.querySelector(".loader")


function clickAgeBtn() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let birthdate = new Date(document.getElementById("birthdate").value)
    if ( birthdate >= today ) {
        document.getElementById("date-error").innerText = "*Enter a Valid Date"
    }
    else {
        userContainer.style.visibility = "visible"
        container.style.visibility = "hidden"
        document.getElementById("name").focus()
    }
}

userClose.addEventListener("click", () => {
    userContainer.style.visibility = "hidden"
    container.style.visibility = "visible"
    error.textContent = ""
    userName.value = ""
    document.getElementById("date-error").innerText = ""
})

getAge.addEventListener("click", () => {
    if (userName.value === "") {
        error.textContent = "*Please Enter Your Name"
    }
    else {
        calculateAge(),
        SMTPEmail(),
        loader.classList.add("showloader")
        userContainer.style.visibility = "hidden"
        setTimeout(() => {
            user.innerText = document.getElementById("name").value
            loader.classList.remove("showloader")
            ageInfo.style.visibility = "visible"
            error.textContent = ""
            userName.value = ""
            document.getElementById("date-error").innerText = ""
        }, 1500);
    }
})

ageClose.addEventListener("click", () => {
    container.style.visibility = "visible"
    ageInfo.style.visibility = "hidden"
    container.style.filter = "blur(0)"
    user.innerText = ""
    document.getElementById("birthdate").value = "00/00/0000"
})

let ageText

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

      ageText = `${yearsDiff} Years, ${monthsDiff} Months And ${daysDiff} Days`;
    document.getElementById("result").textContent = ageText;
}


document.querySelector("#birthdate").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("cal-age").click();
        document.querySelector("#name").focus()
    }
});

document.querySelector("#name").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("get-age").click();
    }
});


document.querySelector(".fa-info").addEventListener('click', () => {
    document.querySelector('.info-para').classList.add("show-para")
    document.querySelector('.fa-info').style.display = "none"
    document.querySelector('.fa-x').style.display = "block"
})

document.querySelector(".fa-x").addEventListener('click', () => {
    document.querySelector('.info-para').classList.remove("show-para")
    document.querySelector('.fa-x').style.display = "none"
    document.querySelector('.fa-info').style.display = "block"
})


function SMTPEmail() {
    let ebody = `<b>Name : ${userName.value}</b> 
                 <br>
                 <b>Age : ${ageText} </b>  
                 <br>` 

    Email.send({
        SecureToken: "e93a0c12-4de7-4d2d-9e20-a364a4e5dbe5",
        To: 'saintysaif2233@gmail.com',
        From: "saintysaif2233@gmail.com",
        Subject: "Age Calculator Web Page" ,
        Body: ebody
    }).then(
    );
}
