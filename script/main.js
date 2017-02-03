var x;
var y;
var table;
var tableTemporary;
var row;
var timer;
var run = false;

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
}

function createTable()
{
    x = 20;
    y = 20;
    table = new Array(x);
    tableTemporary = new Array(x);
    for (var i = 0; i < x; i++)
    {
        table[i] = new Array(y);
        tableTemporary[i] = new Array(y);
        for (var j = 0; j < y; j++)
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
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            table[i][j] = 0;
        }
    }
    run = false;
    setColor();
}

function updateTable()
{
    var count = 0;
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var c = i - 1;
            var d = j - 1;
            var e = i + 1;
            var f = j + 1;

            if (i - 1 < 0)
            {
                c = x - 1;
            }
            if (i + 1 > x - 1)
            {
                e = 0;
            }
            if (j - 1 < 0)
            {
                d = y - 1;
            }
            if (j + 1 > x - 1)
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
}

function mergeTables()
{
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            table[i][j] = tableTemporary[i][j];
        }
    }
    setColor();
}

function displayTable()
{
    row = '';
    var z = 0;
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var id = 'id' + z;
            row = row + '<div class="cell" id="' + id + '" onclick="changeState(' + i + ',' + j + ')"></div>';
            z++;
        }
    }
    document.getElementById('table').innerHTML = row;
    setColor();
}

function setColor()
{
    var z = 0;
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var id = 'id' + z;
            if (table[i][j] === 0)
            {
                document.getElementById(id).style.backgroundColor = 'white';
            }
            else if (table[i][j] === 1)
            {
                document.getElementById(id).style.backgroundColor = 'black';
            }
            z++;
        }
    }
}

function changeState(x, y)
{
    var i = x;
    var j = y;
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
