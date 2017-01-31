var x;
var y;
var table;
var tableTemporary;
var row;

function load()
{
    createTable();
    displayTable();
    var button = document.getElementById('button');
    button.addEventListener('click', updateTable);

    /*var element = document.getElementById('id00');
    element.addEventListener('click', changeState);*/
}

function createTable()
{
    x = 10;
    y = 10;
    table = new Array(x);
    for (var i = 0; i < x; i++)
    {
        table[i] = new Array(y);
    }
    for (var j = 0; j < x; j++)
    {
        for (var k = 0; k < y; k++)
        {
            table[j][k] = 0;
        }
    }
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
            if (i === 1 && j === 1)
            {
                console.log(count);
            }
            count = 0;
        }
    }
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

document.addEventListener('DOMContentLoaded', load);
