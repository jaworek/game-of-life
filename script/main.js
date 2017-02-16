var width;
var height;
var table;
var timer;
var run = true;
var alive;
var dead;
var g = 0;

function load()
{
    createTable();

    document.getElementById('previous').disabled = true;

    var runButton = document.getElementById('run');
    runButton.addEventListener('click', runFunction);
    var reset = document.getElementById('reset');
    reset.addEventListener('click', resetTable);
    var next = document.getElementById('next');
    next.addEventListener('click', nextGeneration);
    var previous = document.getElementById('previous');
    previous.addEventListener('click', previousGeneration);
    var go = document.getElementById('go');
    go.addEventListener('click', goTest);
}

function goTest()
{
    var value = document.getElementById('test').value;
    console.log(value);
}

function createTable()
{
    width = 20;
    height = 20;
    var row = '';
    var index = 0;
    table = [];
    for (var i = 0; i < width; i++)
    {
        table[i] = [];
        for (var j = 0; j < height; j++)
        {
            table[i][j] = [];
            table[i][j][g] = 0;
            var id = 'id' + index;
            row = row + '<div class="cell" id="' + id + '" onclick="changeState(' + i + ',' + j + ')"></div>';
            index++;
        }
    }
    document.getElementById('table').innerHTML = row;

    alive = 0;
    dead = width * height;
    displayInformation();
}

function displayInformation()
{
    document.getElementById('generation').innerHTML = g + 1;
    document.getElementById('alive').innerHTML = alive;
    document.getElementById('dead').innerHTML = dead;
}

function previousGeneration()
{
    g--;
    mergeTables();
    if (g === 0)
    {
        document.getElementById('previous').disabled = true;
    }
    displayInformation();
}

function nextGeneration()
{
    updateTable();
    document.getElementById('previous').disabled = false;
}

function resetTable()
{
    g = 0;
    run = false;
    runFunction();
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            table[i][j][g] = 0;
            setColor(i, j);
        }
    }
    generation = 1;
    alive = 0;
    dead = width * height;
    displayInformation();
}

function updateTable()
{
    var neighbor = 0;
    alive = 0;
    dead = 0;
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            var c = i - 1;
            var d = j - 1;
            var e = i + 1;
            var f = j + 1;

            if (c < 0)
            {
                c = width - 1;
            }
            if (e > width - 1)
            {
                e = 0;
            }
            if (d < 0)
            {
                d = height - 1;
            }
            if (f > width - 1)
            {
                f = 0;
            }

            //Checking neighbours
            if (table[c][j][g] === 1)
            {
                neighbor++;
            }
            if (table[e][j][g] === 1)
            {
                neighbor++;
            }
            if (table[i][d][g] === 1)
            {
                neighbor++;
            }
            if (table[i][f][g] === 1)
            {
                neighbor++;
            }
            if (table[c][d][g] === 1)
            {
                neighbor++;
            }
            if (table[c][f][g] === 1)
            {
                neighbor++;
            }
            if (table[e][d][g] === 1)
            {
                neighbor++;
            }
            if (table[e][f][g] === 1)
            {
                neighbor++;
            }

            //Change state
            if (table[i][j][g] === 0 && neighbor === 3)
            {
                table[i][j][g + 1] = 1;
                alive++;
            }
            else if (table[i][j][g] === 1 && (neighbor === 2 || neighbor === 3))
            {
                table[i][j][g + 1] = 1;
                alive++;
            }
            else
            {
                table[i][j][g + 1] = 0;
                dead++;
            }
            neighbor = 0;
        }
    }
    g++;
    mergeTables();
    displayInformation();
}

function mergeTables()
{
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            setColor(i, j);
        }
    }
}

function setColor(i, j)
{
    var index = i * width + j;
    var id = 'id' + index;
    if (table[i][j][g] === 0)
    {
        document.getElementById(id).style.backgroundColor = 'white';
    }
    else if (table[i][j][g] === 1)
    {
        document.getElementById(id).style.backgroundColor = 'black';
    }
}

function changeState(i, j)
{
    if (table[i][j][g] === 0)
    {
        table[i][j][g] = 1;
        alive++;
        dead--;
    }
    else if (table[i][j][g] === 1)
    {
        table[i][j][g] = 0;
        alive--;
        dead++;
    }
    setColor(i, j);
    displayInformation();
}

function runFunction()
{
    var runButton = document.getElementById('run');
    if (run)
    {
        clearInterval(timer);
        timer = setInterval(updateTable, 200);

        run = false;
        runButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i> Pause';
        document.getElementById('previous').disabled = true;
        document.getElementById('next').disabled = true;
    }
    else
    {
        clearInterval(timer);
        run = true;
        runButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Run';
        if (g !== 0)
        {
            document.getElementById('previous').disabled = false;
        }
        document.getElementById('next').disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', load);
