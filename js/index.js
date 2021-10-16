var fails = 0;
var corrects = 0;
var IMG_BOXES =
    ["alicia", "alicia", "aliens", "aliens", "hg", "hg", "once", "once", "sp", "sp", "tasm", "tasm", "ts", "ts", "lv", "lv"];
var click = 0;
var firstBoxID;
var secondtBoxID;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnSubmit").addEventListener("click", validateInput);
    document.getElementById("table").addEventListener("click", clickOnBox);
});

function validateInput() {
    let nick = document.getElementById("nick").value;
    var regex = /^[A-Z][a-z0-9]{4,8}$/;
    if (regex.test(nick)) {
        document.getElementById("form").classList.add("d-none");
        displayTable();
    } else {
        document.getElementById("failInput").innerHTML = `${nick} incorrect format, example: Jordi8`;
    }
}

function displayTable() {
    order(IMG_BOXES);
    let indexIMG = 0;
    let stadistics = document.createElement("p");
    stadistics.innerHTML = `<p><strong>Intentos:</strong> <span id="fails">0</span>/8 <strong>Aciertos:</strong> <span
    id="corrects">0</span></p>`;

    document.getElementById("stadistics").appendChild(stadistics);

    for (let i = 0; i < 4; i++) {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        for (let j = 0; j < 4; j++) {
            let box = document.createElement("div");
            box.id = indexIMG;
            box.classList.add("col");
            box.classList.add("m-2");
            box.classList.add(IMG_BOXES[indexIMG]);
            box.classList.add("default");
            divRow.appendChild(box);
            indexIMG++;
        }
        document.getElementById("table").appendChild(divRow);
    }
}

function clickOnBox(e) {
    if (IMG_BOXES.includes(IMG_BOXES[e.target.id])) {
        click++;
        if (click == 1) {
            firstBoxID = e.target.id;
            document.getElementById(firstBoxID).classList.remove("default");
        } else if (click == 2) {
            secondtBoxID = e.target.id;
            document.getElementById(secondtBoxID).classList.remove("default");
        }
        if (click >= 2) {
            if (IMG_BOXES[firstBoxID] == IMG_BOXES[secondtBoxID]) {
                corrects++;
                document.getElementById("corrects").innerText = corrects;
            } else {
                fails++;
                document.getElementById("fails").innerText = fails;
                setTimeout(function () {
                    document.getElementById(firstBoxID).classList.add("default");
                    document.getElementById(secondtBoxID).classList.add("default");
                }, 500);
            }
            score();
            click = 0;
        }
    }
}

function order(arrayColors) {
    return arrayColors.sort(function () {
        return Math.random() - 0.5;
    });
}

function score() {
    if (fails >= 8) {
        alert(document.getElementById("nick").value + " loses");
        window.location.href = "https://jordirocha.github.io/CardGame/";
    }

    if (corrects == 8) {
        alert(document.getElementById("nick").value + " wins");
        window.location.href = "https://jordirocha.github.io/CardGame/";
    }
}