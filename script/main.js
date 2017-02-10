var width;
var height;
var table;
var tableTemporary;
var timer;
var run = true;
var generation = 1;
var alive;
var dead;

function load()
{
    createTable();

    var runButton = document.getElementById('run');
    runButton.addEventListener('click', runFunction);
    var reset = document.getElementById('reset');
    reset.addEventListener('click', resetTable);
    var cycle = document.getElementById('cycle');
    cycle.addEventListener('click', updateTable);
    //var cycle10 = document.getElementById('cycle10');
    //cycle10.addEventListener('click', howMany(10));
}

function createTable()
{
    width = 20;
    height = 20;
    var row = '';
    var index = 0;
    table = [];
    tableTemporary = new Array(width);
    for (var i = 0; i < width; i++)
    {
        table[i] = [];
        tableTemporary[i] = new Array(height);
        for (var j = 0; j < height; j++)
        {
            table[i][j] = 0;
            tableTemporary[i][j] = 0;
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
    document.getElementById('generation').innerHTML = generation;
    document.getElementById('alive').innerHTML = alive;
    document.getElementById('dead').innerHTML = dead;
}

function resetTable()
{
    clearInterval(timer);
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            table[i][j] = 0;
            setColor(i, j);
        }
    }
    run = false;
    runFunction();
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
            if (table[c][j] === 1)
            {
                neighbor++;
            }
            if (table[e][j] === 1)
            {
                neighbor++;
            }
            if (table[i][d] === 1)
            {
                neighbor++;
            }
            if (table[i][f] === 1)
            {
                neighbor++;
            }
            if (table[c][d] === 1)
            {
                neighbor++;
            }
            if (table[c][f] === 1)
            {
                neighbor++;
            }
            if (table[e][d] === 1)
            {
                neighbor++;
            }
            if (table[e][f] === 1)
            {
                neighbor++;
            }

            //Change state
            if (table[i][j] === 0 && neighbor === 3)
            {
                tableTemporary[i][j] = 1;
                alive++;
            }
            else if (table[i][j] === 1 && (neighbor === 2 || neighbor === 3))
            {
                tableTemporary[i][j] = 1;
                alive++;
            }
            else
            {
                tableTemporary[i][j] = 0;
                dead++;
            }

            neighbor = 0;
        }
    }
    generation++;
    mergeTables();
    displayInformation();
}

function mergeTables()
{
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            table[i][j] = tableTemporary[i][j];
            setColor(i, j);
        }
    }
}

function setColor(i, j)
{
    var index = i * width + j;
    var id = 'id' + index;
    if (table[i][j] === 0)
    {
        document.getElementById(id).style.backgroundColor = 'white';
    }
    else if (table[i][j] === 1)
    {
        document.getElementById(id).style.backgroundColor = 'black';
    }
}

function changeState(i, j)
{
    if (table[i][j] === 0)
    {
        table[i][j] = 1;
        alive++;
        dead--;
    }
    else if (table[i][j] === 1)
    {
        table[i][j] = 0;
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
    }
    else
    {
        clearInterval(timer);
        run = true;
        runButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Run';
    }
}

document.addEventListener('DOMContentLoaded', load);
