var width;
var height;
var table;
var tableTemporary;
var row;
var timer;
var run = false;
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
        }
    }
    displayTable();
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

            if (i - 1 < 0)
            {
                c = width - 1;
            }
            if (i + 1 > width - 1)
            {
                e = 0;
            }
            if (j - 1 < 0)
            {
                d = height - 1;
            }
            if (j + 1 > width - 1)
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

function displayTable()
{
    row = '';
    var index = 0;
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            var id = 'id' + index;
            row = row + '<div class="cell" id="' + id + '" onclick="changeState(' + i + ',' + j + ')"></div>';
            index++;
        }
    }
    document.getElementById('table').innerHTML = row;
    setColor();
}

function setColor()
{
    var index = 0;
    for (var i = 0; i < width; i++)
    {
        for (var j = 0; j < height; j++)
        {
            var id = 'id' + index;
            if (table[i][j] === 0)
            {
                document.getElementById(id).style.backgroundColor = 'white';
            }
            else if (table[i][j] === 1)
            {
                document.getElementById(id).style.backgroundColor = 'black';
            }
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

function runButton()
{
    var runButton = document.getElementById('run');
    if (run === true)
    {
        runButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i> Pause';
    }
    if (run === false)
    {
        runButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Run';
    }
}

function runFunction()
{
    if (run === false)
    {
        clearInterval(timer);
        timer = setInterval(updateTable, 200);

        run = true;
        runButton();
    }
    else
    {
        clearInterval(timer);
        run = false;
        runButton();
    }
}

document.addEventListener('DOMContentLoaded', load);
