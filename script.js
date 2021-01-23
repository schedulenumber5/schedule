const dateText = document.getElementsByClassName('date-text')[0];
const hwBlock = document.getElementsByClassName('hw-block')[0];
const sunBlock = document.getElementsByClassName('sun')[0];
const monBlock = document.getElementsByClassName('mon')[0];
const tueBlock = document.getElementsByClassName('tue')[0];
const wedBlock = document.getElementsByClassName('wed')[0];
const thuBlock = document.getElementsByClassName('thu')[0];
const friBlock = document.getElementsByClassName('fri')[0];
const satBlock = document.getElementsByClassName('sat')[0];

let currentDate = 0;
let currentDayOfWeek = 0;

hwUrl = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/document/d/e/2PACX-1vSVKDIRjk_cCLfdWRK31xmR8-XyeKE6ylPV7nV9_PyWMqF6N49U6cz3bIlhTHl8GoKWt3cSFky4jrIm/pub';

function getDate() {
    let now = new Date();
    if (now.getHours() >= 12) {
        isPast12 = true;
        now = addDays(now, 1);
    }
    currentDayOfWeek = now.getDay();
    currentDate = now;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function render() {
    dateText.innerText = '';
    console.log(addDays(new Date(), 1).toLocaleDateString());
    if (currentDate.toLocaleDateString() == (new Date()).toLocaleDateString()) {
        dateText.innerText += "(сегодня) ";
    }
    if (currentDate.toLocaleDateString() == addDays(new Date(), 1).toLocaleDateString()) {
        dateText.innerText += "(завтра) "

    }
    dateText.innerText += " " + currentDate.toLocaleDateString();
    redrawDaySchedule();
}

function redrawDaySchedule() {
    sunBlock.style.display = "none";
    monBlock.style.display = "none";
    tueBlock.style.display = "none";
    wedBlock.style.display = "none";
    thuBlock.style.display = "none";
    friBlock.style.display = "none";
    satBlock.style.display = "none";
    console.log(currentDayOfWeek);
    switch (currentDayOfWeek) {
        case (0):
            console.log("it's sunday my dudes");
            sunBlock.style.display = "block";
            break;
        case (1):
            console.log("it's monday my dudes");
            monBlock.style.display = "block";
            break;
        case (2):
            console.log("it's tuesday my dudes");
            tueBlock.style.display = "block";
            break;
        case (3):
            console.log("it's wednesday my dudes");
            wedBlock.style.display = "block";
            break;
        case (4):
            console.log("it's thursday my dudes");
            thuBlock.style.display = "block";
            break;
        case (5):
            console.log("it's friday my dudes");
            friBlock.style.display = "block";
            break;
        case (6):
            console.log("it's saturday my dudes");
            satBlock.style.display = "block";
            break;
    }
}

async function run() {
    try {
        getDate();
        render();
        getHW();
    } catch (e) {
        console.log("Error:" + e);
    }
}

async function getHW() {
    const gotResponse = await fetch(hwUrl);
    const gotHTML = await gotResponse.text();
    let dummy = document.createElement('html');
    dummy.innerHTML = gotHTML;
    let contents = dummy.querySelector('#contents');
    contents = contents.getElementsByTagName('div');
    hwBlock.appendChild(contents[0]);
}

function httpGet(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response)
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error"));
        };
        xhr.send();
    });
}

function changeDay(num) {
    currentDate = addDays(currentDate, num);
    if (currentDayOfWeek + num < 0) {
        currentDayOfWeek = 6;
    } else {
        currentDayOfWeek = (currentDayOfWeek + num) % 7;
    }
    console.log(currentDate.toLocaleString())
    render();
}

run();