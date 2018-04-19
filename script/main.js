let width;
let height;
let table;
let timer;
let run = true;
let alive;
let dead;
let g = 0;
let interval = 200;

const runButton = document.getElementById('run');
runButton.addEventListener('click', runFunction);
const reset = document.getElementById('reset');
reset.addEventListener('click', resetTable);
const next = document.getElementById('next');
next.addEventListener('click', nextGeneration);
const previous = document.getElementById('previous');
previous.addEventListener('click', previousGeneration);
const random = document.getElementById('random');
random.addEventListener('click', randomFill);

function load() {
    createTable();

    document.getElementById('previous').disabled = true;
    document.getElementById('interval').value = interval;
}

function createTable() {
    width = 20;
    height = 20;
    let row = '';
    let index = 0;
    table = [];
    for (let i = 0; i < width; i++) {
        table[i] = [];
        for (let j = 0; j < height; j++) {
            table[i][j] = [];
            table[i][j][g] = 0;
            let id = 'id' + index;
            row = row + '<div class="cell" id="' + id + '" onclick="changeState(' + i + ',' + j + ')"></div>';
            index++;
        }
    }
    document.getElementById('table').innerHTML = row;

    alive = 0;
    dead = width * height;
    displayInformation();
}

function displayInformation() {
    document.getElementById('generation').innerHTML = g + 1;
    document.getElementById('alive').innerHTML = alive;
    document.getElementById('dead').innerHTML = dead;
}

function previousGeneration() {
    g--;
    mergeTables();
    if (g <= 0) {
        document.getElementById('previous').disabled = true;
    }
    displayInformation();
}

function nextGeneration() {
    updateTable();
    document.getElementById('previous').disabled = false;
}

function resetTable() {
    g = 0;
    run = false;
    runFunction();
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            table[i][j][g] = 0;
            setColor(i, j);
        }
    }
    alive = 0;
    dead = width * height;
    displayInformation();
    document.getElementById('previous').disabled = true;
}

function randomFill() {
    g = 0;
    alive = 0;
    dead = 0;
    run = false;
    runFunction();
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let state = Math.floor(Math.random() * 2);
            table[i][j][g] = state;
            setColor(i, j);
            if (state === 0) {
                dead++;
            } else {
                alive++;
            }
        }
    }
    displayInformation();
}

function updateTable() {
    let neighbour = 0;
    alive = 0;
    dead = 0;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let c = i - 1;
            let d = j - 1;
            let e = i + 1;
            let f = j + 1;

            if (c < 0) {
                c = width - 1;
            }
            if (e > width - 1) {
                e = 0;
            }
            if (d < 0) {
                d = height - 1;
            }
            if (f > width - 1) {
                f = 0;
            }

            //Checking neighbours
            if (table[c][j][g] === 1) {
                neighbour++;
            }
            if (table[e][j][g] === 1) {
                neighbour++;
            }
            if (table[i][d][g] === 1) {
                neighbour++;
            }
            if (table[i][f][g] === 1) {
                neighbour++;
            }
            if (table[c][d][g] === 1) {
                neighbour++;
            }
            if (table[c][f][g] === 1) {
                neighbour++;
            }
            if (table[e][d][g] === 1) {
                neighbour++;
            }
            if (table[e][f][g] === 1) {
                neighbour++;
            }

            //Change state
            if (table[i][j][g] === 0 && neighbour === 3) {
                table[i][j][g + 1] = 1;
                alive++;
            } else if (table[i][j][g] === 1 && (neighbour === 2 || neighbour === 3)) {
                table[i][j][g + 1] = 1;
                alive++;
            } else {
                table[i][j][g + 1] = 0;
                dead++;
            }
            neighbour = 0;
        }
    }
    g++;
    mergeTables();
    displayInformation();
}

function mergeTables() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            setColor(i, j);
        }
    }
}

function setColor(i, j) {
    let index = i * width + j;
    let id = 'id' + index;
    if (table[i][j][g] === 0) {
        document.getElementById(id).style.backgroundColor = 'white';
    } else if (table[i][j][g] === 1) {
        document.getElementById(id).style.backgroundColor = 'black';
    }
}

function changeState(i, j) {
    if (table[i][j][g] === 0) {
        table[i][j][g] = 1;
        alive++;
        dead--;
    } else {
        table[i][j][g] = 0;
        alive--;
        dead++;
    }
    setColor(i, j);
    displayInformation();
}

function runFunction() {
    if (run) {
        interval = document.getElementById('interval').value;
        clearInterval(timer);
        timer = setInterval(updateTable, interval);

        run = false;
        runButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i> Pause';
        document.getElementById('previous').disabled = true;
        document.getElementById('next').disabled = true;
        document.getElementById('interval').disabled = true;
        document.getElementById('random').disabled = true;
    } else {
        clearInterval(timer);
        run = true;
        runButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Run';
        if (g !== 0) {
            document.getElementById('previous').disabled = false;
        }
        document.getElementById('next').disabled = false;
        document.getElementById('interval').disabled = false;
        document.getElementById('random').disabled = false;
    }
}

load();
