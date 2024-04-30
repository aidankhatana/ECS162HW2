document.addEventListener("DOMContentLoaded", function() {
    const boards = [

        [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],

        [
            [0, 2, 0, 6, 0, 8, 0, 0, 0],
            [5, 8, 0, 0, 0, 9, 7, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0, 0],
            [3, 7, 0, 0, 0, 0, 5, 0, 0],
            [6, 0, 0, 0, 0, 0, 0, 0, 4],
            [0, 0, 8, 0, 0, 0, 0, 1, 3],
            [0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 9, 8, 0, 0, 0, 3, 6],
            [0, 0, 0, 3, 0, 6, 0, 9, 0]
        ],

        [
            [1, 0, 0, 0, 0, 7, 0, 9, 0],
            [0, 3, 0, 0, 2, 0, 0, 0, 8],
            [0, 0, 9, 6, 0, 0, 5, 0, 0],
            [0, 0, 5, 3, 0, 0, 9, 0, 0],
            [0, 1, 0, 0, 8, 0, 0, 0, 2],
            [6, 0, 0, 0, 0, 4, 0, 0, 0],
            [3, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 4, 0, 0, 0, 0, 0, 0, 7],
            [0, 0, 7, 0, 0, 0, 3, 0, 0]
        ],

        [
            [1, 0, 0, 4, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 8, 0],
            [0, 0, 9, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3],
            [0, 0, 1, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 6, 0, 0]
        ],

        [
            [0, 0, 0, 6, 0, 0, 4, 0, 0],
            [7, 0, 0, 0, 0, 3, 6, 0, 0],
            [0, 0, 0, 0, 9, 1, 0, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 1, 8, 0, 0, 0, 3],
            [0, 0, 0, 3, 0, 0, 0, 0, 5],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],

        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 0, 3],
            [0, 7, 4, 0, 8, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 2],
            [0, 8, 0, 0, 4, 0, 0, 1, 0],
            [6, 0, 0, 5, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 7, 8, 0],
            [5, 0, 0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

    ];



    let currentBoardIndex = 0;
    const restartButton = document.getElementById('restart-button');
    const resetButton = document.getElementById('resetButton');

    restartButton.addEventListener('click', function() {
        currentBoardIndex = (currentBoardIndex + 1) % boards.length;
        generateBoard(boards[currentBoardIndex]);
    });

    resetButton.addEventListener('click', function() {
        resetBoard();
    });

    function generateBoard(board) {
        const table = document.getElementById('sudoku-board');
        table.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for (let j = 0; j < 9; j++) {
                let td = document.createElement('td');
                let input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1; //one input
                input.style.width = "100%";
                input.style.height = "100%";
                input.style.textAlign = "center";

                if (board[i][j] !== 0) {
                    input.value = board[i][j];
                    input.readOnly = true;
                    input.classList.add('fixed'); 
                } else {
                    input.addEventListener('input', function() {
                        this.value = this.value.replace(/[^1-9]/gi, ''); // only 1-9
                        if (checkWin()) {
                            alert("Congratulations, you won!");
                        }
                    });
                    input.classList.add('editable'); 
                }
                td.appendChild(input);
                tr.appendChild(td);
            }
        }
    }

    function resetBoard() {
        const inputs = document.querySelectorAll('#sudoku-board input.editable');
        inputs.forEach(input => input.value = ''); //clear board except given
    }

    function checkWin() {
        const inputs = document.querySelectorAll('#sudoku-board input');
        let board = [];
        inputs.forEach((input, idx) => {
            let row = Math.floor(idx / 9);
            if (!board[row]) {
                board[row] = [];
            }
            board[row].push(input.value.trim());
        });
    
        //helper to check win
        const isValidSection = (section) => {
            const requiredNumbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
            for (let number of section) {
                if (requiredNumbers.has(number)) {
                    requiredNumbers.delete(number);
                } else {
                    return false;
                }
            }
            return requiredNumbers.size === 0;
        };
    

        for (let row of board) { //rows
            if (!isValidSection(row)) {
                return false;
            }
        }
    
        for (let col = 0; col < 9; col++) { //columns
            const column = [];
            for (let row = 0; row < 9; row++) {
                column.push(board[row][col]);
            }
            if (!isValidSection(column)) {
                return false;
            }
        }
    
        for (let squareStartRow = 0; squareStartRow < 9; squareStartRow += 3) {
            for (let squareStartCol = 0; squareStartCol < 9; squareStartCol += 3) {
                const square = [];
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        square.push(board[squareStartRow + row][squareStartCol + col]);
                    }
                }
                if (!isValidSection(square)) {
                    return false;
                }
            }
        }
    

        return true;
    }
    generateBoard(boards[currentBoardIndex]); //init board
    });