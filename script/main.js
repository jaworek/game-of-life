var width;
var height;
var table;
var tableTemporary;
var timer;
var run = true;
var generation = 1;


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
    //cycle10.addEventListener('click', updateTable * 10);

    document.getElementById('generation').innerHTML = generation;
}

function createTable()
{
    width = 20;
    height = 20;
    var row = '';
    var index = 0;
    table = new Array(width);
    tableTemporary = new Array(width);
    for (var i = 0; i < width; i++)
    {
        table[i] = new Array(height);
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
    setColor();
}

function resetTable()
{
    clearInterval(timer);
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            table[i][j] = 0;
        }
    }
    run = false;
    setColor();
    runFunction();
    generation = 1;
    document.getElementById('generation').innerHTML = generation;
}

function updateTable()
{
    var count = 0;
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
                count++;
            }
            if (table[e][j] === 1)
            {
                count++;
            }
            if (table[i][d] === 1)
            {
                count++;
            }
            if (table[i][f] === 1)
            {
                count++;
            }
            if (table[c][d] === 1)
            {
                count++;
            }
            if (table[c][f] === 1)
            {
                count++;
            }
            if (table[e][d] === 1)
            {
                count++;
            }
            if (table[e][f] === 1)
            {
                count++;
            }

            //Change state
            if (table[i][j] === 0 && count === 3)
            {
                tableTemporary[i][j] = 1;
            }
            else if (table[i][j] === 1 && (count === 2 || count === 3))
            {
                tableTemporary[i][j] = 1;
            }
            else
            {
                tableTemporary[i][j] = 0;
            }

            count = 0;
        }
    }
    mergeTables();
    generation++;
    document.getElementById('generation').innerHTML = generation;
}

function mergeTables()
{
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            table[i][j] = tableTemporary[i][j];
        }
    }
    setColor();
}

function setColor()
{
    var index = 0;
    var alive = 0;
    var dead = 0;
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            var id = 'id' + index;
            if (table[i][j] === 0)
            {
                document.getElementById(id).style.backgroundColor = 'white';
                dead++;
            }
            else if (table[i][j] === 1)
            {
                document.getElementById(id).style.backgroundColor = 'black';
                alive++;
            }
            document.getElementById('dead').innerHTML = dead;
            document.getElementById('alive').innerHTML = alive;
            index++;
        }
    }
}

function changeState(width, height)
{
    var i = width;
    var j = height;
    if (table[i][j] === 0)
    {
        table[i][j] = 1;
    }
    else if (table[i][j] === 1)
    {
        table[i][j] = 0;
    }
    setColor();
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
