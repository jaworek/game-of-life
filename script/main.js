var x;
var y;
var table;
var row;

function load()
{
    x = 10;
    y = 10;
    table = new Array(x);
    for (var i = 0; i < x; i++)
    {
        table[i] = new Array(y);
    }
    createTable();
    displayTable();

    var element = document.getElementById('id00');
    element.addEventListener('click', changeState);
}

function createTable()
{
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            table[i][j] = 0;
        }
    }
}

function updateTable()
{

}

function displayTable()
{
    row = '';
    for (var i = 0; i < x; i++)
    {
        for (var j = 0; j < y; j++)
        {
            var id = 'id' + i + j;
            row = row + '<div class="cell" id="' + id + '">' + table[i][j] + '</div>';
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

function changeState()
{
    if (table[0][0] === 0)
    {
        table[0][0] = 1;
        console.log(table[0][0]);
    }
    else if (table[0][0] === 1)
    {
        table[0][0] = 0;
        console.log(table[0][0]);
    }
    setColor();
}

document.addEventListener('DOMContentLoaded', load);
