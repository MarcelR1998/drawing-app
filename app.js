const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let colorPicker = document.querySelector("#colorPicker");
let lineWidthSlider = document.querySelector("#lineWidth");
let lineWidthDisplay = document.querySelector("#lineWidthDisplay");
let colorButton = document.querySelectorAll(".colorButton");
let colorSpan = document.querySelectorAll(".colorSpan");

//Sets initial button color style, as defined in html file
for (i = 0; i < colorButton.length; i++) {
    colorSpan[i].style.color = colorSpan[i].textContent
    colorButton[i].style.backgroundColor = colorSpan[i].textContent
}

//Initially syncs pen size display with range input  
lineWidthDisplay.textContent = lineWidthSlider.value;

//Pen object, properties get assigned to pen.
let pen = {
    strokeStyle: colorPicker.value,
    lineWidth: lineWidthSlider.value,
    lineCap: "round"
};

let activeId = 0;

//Updates pen object properties each time a parameter is changed
function updatePen() {
    pen.strokeStyle = colorSpan[activeId].textContent;
    pen.lineWidth = lineWidthSlider.value;
    lineWidthDisplay.textContent = lineWidthSlider.value;
}

//Applies color from color picker to color choice buttons.
function changeColor(button) {
    colorSpan[button].textContent = colorPicker.value;
    colorSpan[button].style.color = colorPicker.value;
    colorButton[button].style.backgroundColor = colorPicker.value;
}

//Loops throught color choice buttons, and adds event listener that selects the active Id. Active Id is used to select which button to take color from to pen.
for (i = 0; i < colorButton.length; i++) {
    let buttonId = i;

    colorButton[i].addEventListener("click", function () {
        activeId = buttonId;
        console.log("set activeId to ", activeId);
        updatePen();
    })
}

//event listener for different buttons

let allowNewWindow = true;

window.addEventListener("click", function (e) {
    if (e.target.id == "erase") {
        pen.strokeStyle = "white";
    }

    if (e.target.id == "about") {
        if (allowNewWindow == true) {
            let aboutWindow = document.createElement("div");
            document.body.appendChild(aboutWindow);
            aboutWindow.innerHTML = '<button id="close">X</button><h2>simple<span class="aboutH2Span">Web</span>Draw.js</h2><p>A simple drawing program, written in javascript. <br>Marcel Rossi, 2019 <br>Version 1.0.0</p>'
            aboutWindow.id = "aboutWindow"
            aboutWindowMovement();
            allowNewWindow = false;
        }
    }

    if (e.target.id == "close") {
        document.body.removeChild(aboutWindow);
        allowNewWindow = true;
    }

    if (e.target.id != "aboutWindow" && e.target.id != "about") {
        document.body.removeChild(aboutWindow);
        allowNewWindow = true;
    }

    if (e.target.id == "clearCanvas") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

//Initial set canvas size to window size
canvas.height = 600;
canvas.width = 800;

//Drawing functionality
let painting = false;

function startPosition() {
    painting = true;
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.strokeStyle = pen.strokeStyle;
    ctx.lineWidth = pen.lineWidth;
    ctx.lineCap = pen.lineCap;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

//EventListeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);


//Make about window movable with cursor
//https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging

function aboutWindowMovement() {
    var mousePosition;
    var offset = [0, 0];
    var isDown = false;

    aboutWindow.style.position = "fixed";

    aboutWindow.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            aboutWindow.offsetLeft - e.clientX,
            aboutWindow.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function () {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function (event) {
        //event.preventDefault();
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            aboutWindow.style.left = (mousePosition.x + offset[0]) + 'px';
            aboutWindow.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

}