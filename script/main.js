var x;
var y;
var table;
var tableTemporary;
var row;
var timer;

function load()
{
    createTable();

    var runButton = document.getElementById('run');
    runButton.addEventListener('click', runFunction);
    var reset = document.getElementById('reset');
    reset.addEventListener('click', resetTable);
    var cycle = document.getElementById('cycle');
    cycle.addEventListener('click', updateTable);
}

function createTable()
{
    x = 10;
    y = 10;
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
    setColor();
}

function updateTable()
{
    var count = 0;
    for (var i = 1; i < x - 1; i++)
    {
        for (var j = 1; j < y - 1; j++)
        {
            if (table[i - 1][j] === 1)
            {
                count++;
            }
            if (table[i + 1][j] === 1)
            {
                count++;
            }
            if (table[i][j - 1] === 1)
            {
                count++;
            }
            if (table[i][j + 1] === 1)
            {
                count++;
            }
            if (table[i - 1][j - 1] === 1)
            {
                count++;
            }
            if (table[i - 1][j + 1] === 1)
            {
                count++;
            }
            if (table[i + 1][j - 1] === 1)
            {
                count++;
            }
            if (table[i + 1][j + 1] === 1)
            {
                count++;
            }
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
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var id = 'id' + i + j;
            row = row + '<div class="cell" id="' + id + '" onclick="changeState(' + i + ',' + j + ')"></div>';
        }
    }
    document.getElementById('table').innerHTML = row;
    setColor();
}

function setColor()
{
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var id = 'id' + i + j;
            if (table[i][j] === 0)
            {
                document.getElementById(id).style.backgroundColor = 'white';
            }
            else if (table[i][j] === 1)
            {
                document.getElementById(id).style.backgroundColor = 'black';
            }
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

function runFunction()
{
    clearInterval(timer);
    timer = setInterval(updateTable, 1000);
    console.log("dupa");
}

document.addEventListener('DOMContentLoaded', load);
