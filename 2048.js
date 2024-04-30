"use strict";
let gridDisplay = document.querySelector('#gridContainer');
let scoreDisplay = document.getElementById('score');
let score = 0;
let gridState = new Array(16).fill(undefined);

function startGame() {
    clearGrid();
    score = 0;
    scoreDisplay.innerHTML = score;
    generate();
    generate();
    renderGrid();
}

function clearGrid() {
    gridState.fill(undefined);
    renderGrid();
}

function renderGrid() {
    clearGrid(); 
    gridState.forEach(renderTile); 
}

function clearGrid() {
    gridDisplay.innerHTML = ""; 
}

function renderTile(tile) {
    const gridCell = document.createElement('div'); 
    gridCell.textContent = tile ? tile : ""; 
    gridCell.className = tile ? `tile-${tile}` : ""; 
    gridDisplay.appendChild(gridCell); 
}


function generate() {
    let emptyCells = gridState.map((val, idx) => val === undefined ? idx : null).filter(v => v !== null);
    if (emptyCells.length > 0) {
        let randomNumberIndex = Math.floor(Math.random() * emptyCells.length);
        gridState[emptyCells[randomNumberIndex]] = Math.random() > 0.5 ? 2 : 4;
        renderGrid();
        checkForGameOver();
    }
}

function checkForGameOver() {
    let allSquaresFull = true;
    let noPossibleMoves = true;

    //check all squares full
    for (let i = 0; i < gridDisplay.children.length; i++) {
        if (gridDisplay.children[i].innerHTML === "") {
            allSquaresFull = false;
            break;
        }
    }

    //check no possible moves left
    for (let i = 0; i < gridDisplay.children.length; i++) {
        let currentTile = parseInt(gridDisplay.children[i].innerHTML);
        let rightTile = i % 4 !== 3 ? parseInt(gridDisplay.children[i + 1].innerHTML) : null;
        let bottomTile = i < 12 ? parseInt(gridDisplay.children[i + 4].innerHTML) : null;

        if (currentTile === rightTile || currentTile === bottomTile) {
            noPossibleMoves = false;
            break;
        }
    }

    //game over
    if (allSquaresFull && noPossibleMoves) {
        alert("Game Over! Your final score is: " + score);
    }
}



document.addEventListener('keyup', function(e) { 
    let key = "";
    switch(e.key) {
        case 'ArrowUp':
            key = 'up';
            break;
        case 'ArrowDown':
            key = 'down';
            break;
        case 'ArrowLeft':
            key = 'left';
            break;
        case 'ArrowRight':
            key = 'right';
            break;
        default:
            return;
    }
    moveTiles(key);
});

function moveTiles(key) {
    let moved = false;
    switch(key) {
        case 'up':
            moved = moveUp();
            break;
        case 'down':
            moved = moveDown();
            break;
        case 'left':
            moved = moveLeft();
            break;
        case 'right':
            moved = moveRight();
            break;
    }
    if (moved) {
        generate();
    } else {
        renderGrid();
    }
}

function moveUp() {
    let moved = false;
    let combined = new Array(16).fill(false); //track cells that have combined

    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            let currentIdx = col + row * 4;
            if (gridState[currentIdx] !== undefined) {
                let targetIdx = currentIdx;
                while (targetIdx - 4 >= 0 && gridState[targetIdx - 4] === undefined) {
                    targetIdx -= 4;
                }
                if (targetIdx - 4 >= 0 && gridState[targetIdx - 4] === gridState[currentIdx] && !combined[targetIdx - 4]) {
                    gridState[targetIdx - 4] *= 2;
                    score += gridState[targetIdx - 4];
                    scoreDisplay.innerHTML = score; //update score
                    gridState[currentIdx] = undefined;
                    combined[targetIdx - 4] = true;
                    moved = true;
                } else if (targetIdx !== currentIdx) {
                    gridState[targetIdx] = gridState[currentIdx];
                    gridState[currentIdx] = undefined;
                    moved = true;
                }
            }
        }
    }
    return moved;
}


function moveDown() {
    let moved = false;
    let combined = new Array(16).fill(false);  

    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {  
            let currentIdx = col + row * 4;
            if (gridState[currentIdx] !== undefined) {
                let targetIdx = currentIdx;

                while (targetIdx + 4 < 16 && gridState[targetIdx + 4] === undefined) {
                    targetIdx += 4;
                }

                if (targetIdx + 4 < 16 && gridState[targetIdx + 4] === gridState[currentIdx] && !combined[targetIdx + 4]) {
                    gridState[targetIdx + 4] *= 2;
                    score += gridState[targetIdx + 4];
                    scoreDisplay.innerHTML = score; 
                    gridState[currentIdx] = undefined;
                    combined[targetIdx + 4] = true;
                    moved = true;
                } else if (targetIdx !== currentIdx) { 
                    gridState[targetIdx] = gridState[currentIdx];
                    gridState[currentIdx] = undefined;
                    moved = true;
                }
            }
        }
    }
    return moved;
}



function moveLeft() {
    let moved = false;
    let combined = new Array(16).fill(false); 

    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            let currentIdx = col + row * 4;
            if (gridState[currentIdx] !== undefined) {
                let targetIdx = currentIdx;
                while (targetIdx % 4 > 0 && gridState[targetIdx - 1] === undefined) {
                    targetIdx -= 1;
                }
                if (targetIdx % 4 > 0 && gridState[targetIdx - 1] === gridState[currentIdx] && !combined[targetIdx - 1]) {
                    gridState[targetIdx - 1] *= 2;
                    score += gridState[targetIdx - 1]; 
                    scoreDisplay.innerHTML = score;
                    gridState[currentIdx] = undefined;
                    combined[targetIdx - 1] = true; 
                    moved = true;
                } else if (targetIdx !== currentIdx) {
                    gridState[targetIdx] = gridState[currentIdx];
                    gridState[currentIdx] = undefined;
                    moved = true;
                }
            }
        }
    }
    return moved;
}



function moveRight() {
    let moved = false;
    let combined = new Array(16).fill(false); 

    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            let currentIdx = col + row * 4;
            if (gridState[currentIdx] !== undefined) {
                let targetIdx = currentIdx;
                while (targetIdx % 4 < 3 && gridState[targetIdx + 1] === undefined) {
                    targetIdx += 1;
                }
                if (targetIdx % 4 < 3 && gridState[targetIdx + 1] === gridState[currentIdx] && !combined[targetIdx + 1]) {
                    gridState[targetIdx + 1] *= 2;
                    score += gridState[targetIdx + 1];
                    scoreDisplay.innerHTML = score; 
                    gridState[currentIdx] = undefined;
                    combined[targetIdx + 1] = true; 
                    moved = true;
                } else if (targetIdx !== currentIdx) {
                    gridState[targetIdx] = gridState[currentIdx];
                    gridState[currentIdx] = undefined;
                    moved = true;
                }
            }
        }
    }
    return moved;
}


startGame();
