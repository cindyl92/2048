import React, { Component } from 'react';
import './Tiles.css';

const GRID_SIZE = 4;

class Tiles extends Component {
    state = {
        tiles: [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    constructor(props) {
        super();
        let posX1 = Math.floor(Math.random() * GRID_SIZE);
        let posY1 = Math.floor(Math.random() * GRID_SIZE);
        let posX2 = Math.floor(Math.random() * GRID_SIZE);
        let posY2 = Math.floor(Math.random() * GRID_SIZE);

        while (posX1 === posX2 && posY1 === posY2) {
            posX2 = Math.floor(Math.random() * GRID_SIZE);
            posY2 = Math.floor(Math.random() * GRID_SIZE);
        }

        let newGameTiles = [...this.state.tiles];
        //console.log(newGameTiles);
        newGameTiles[posX1][posY1] = this.getRandomTileValue();
        newGameTiles[posX2][posY2] = this.getRandomTileValue();
        console.log(posX1 + ", " + posY1);
        console.log(posX2 + ", " + posY2);

        this.setState({tiles: newGameTiles});

    }

    getRandomTileValue = () => {
        // 5% probability to get "4"
        // otherwise get "2"
        let randomNum = Math.floor(Math.random() * 100);
        if (randomNum < 5) return 4;
        else return 2;
    }

    onKeyDownHanlder = (e) => {
        if (e.key === "ArrowRight") {
            this.shiftRight();
        }
        if (e.key === "ArrowLeft") {
            this.shiftLeft();
        }
        if (e.key === "ArrowUp") {
            this.shiftUp();
        }
        if (e.key === "ArrowDown") {
            this.shiftDown();
        }
    }

    shiftRight = () => {
        let updatedTiles = [...this.state.tiles];
        let emptyTiles = [];

        for (let i=0; i<GRID_SIZE; i++) {
            let zeros = updatedTiles[i][GRID_SIZE-1] === 0 ? [GRID_SIZE-1] : [];
            let index = GRID_SIZE-1;
            let prevIndex = GRID_SIZE-1;
            let prevVal = updatedTiles[i][GRID_SIZE-1];
            let emptyTile = updatedTiles[i][GRID_SIZE-1] === 0 ? [[i,GRID_SIZE-1]] : [];
            
            for (let j=GRID_SIZE-2; j>=0; j--) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) {
                    emptyTile.push([i,j]);
                    zeros.push(j);
                }

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    emptyTile.push([i,j]);
                    
                    updatedTiles[i][index] = prevVal * 2;
                    if (prevVal * 2 === 2048) {
                        alert("You win!");
                    }

                    if (index !== prevIndex && !zeros.includes(prevIndex)) {
                        updatedTiles[i][prevIndex] = 0;
                        emptyTile.push([i,prevIndex]);
                    }

                    zeros.push(j);
                    prevVal = 0;
                    index = j+zeros.length;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = j;
                    index = j+zeros.length;
                    if (zeros.length !== 0) {
                        if (zeros.includes(index)) {
                            zeros.shift();
                            emptyTile.shift();
                        }
                        updatedTiles[i][index] = prevVal;
                        updatedTiles[i][j] = 0;
                        emptyTile.push([i,j]);
                        zeros.push(j);
                    }
                }
            }
            //console.log(emptyTile);
            emptyTile.forEach(element => {
                emptyTiles.push(element);    
            });
            
        }
        //console.log(emptyTiles);

        if (emptyTiles.length === 0) {
            /// TODO: Check if the tiles are not movable
            alert("You Loose");
        }
        else {
            let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            updatedTiles[newTile[0]][newTile[1]] = this.getRandomTileValue();
        }
        this.setState({tiles: updatedTiles});
    }

    shiftLeft = () => {
        let updatedTiles = [...this.state.tiles];
        let emptyTiles = [];

        for (let i=0; i<GRID_SIZE; i++) {
            let zeros = updatedTiles[i][0] === 0 ? [0] : [];
            let index = 0;
            let prevIndex = 0;
            let prevVal = updatedTiles[i][0];
            let emptyTile = updatedTiles[i][0] === 0 ? [[i,0]] : [];
            
            for (let j=1; j<GRID_SIZE; j++) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) {
                    emptyTile.push([i,j]);
                    zeros.push(j);
                }

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    emptyTile.push([i,j]);
                    
                    updatedTiles[i][index] = prevVal * 2;
                    if (prevVal * 2 === 2048) {
                        alert("You win!");
                    }

                    if (index !== prevIndex && !zeros.includes(prevIndex)) {
                        updatedTiles[i][prevIndex] = 0;
                        emptyTile.push([i,prevIndex]);
                    }

                    zeros.push(j);
                    prevVal = 0;
                    index = j-zeros.length;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = j;
                    index = j-zeros.length;
                    if (zeros.length !== 0) {
                        if (zeros.includes(index)) {
                            zeros.shift();
                            emptyTile.shift();
                        }
                        updatedTiles[i][index] = prevVal;
                        updatedTiles[i][j] = 0;
                        emptyTile.push([i,j]);
                        zeros.push(j);
                    }
                }
            }
            //console.log(emptyTile);
            emptyTile.forEach(element => {
                emptyTiles.push(element);    
            });
            
        }
        //console.log(emptyTiles);

        if (emptyTiles.length === 0) {
            /// TODO: Check if the tiles are not movable
            alert("You Loose");
        }
        else {
            let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            updatedTiles[newTile[0]][newTile[1]] = this.getRandomTileValue();
        }
        this.setState({tiles: updatedTiles});
    }

    shiftUp = () => {
        let updatedTiles = [...this.state.tiles];
        let emptyTiles = [];

        for (let j=0; j<GRID_SIZE; j++) {
            let zeros = updatedTiles[0][j] === 0 ? [0] : [];
            let index = 0;
            let prevIndex = 0;
            let prevVal = updatedTiles[0][j];
            let emptyTile = updatedTiles[0][j] === 0 ? [[0,j]] : [];
            
            for (let i=1; i<GRID_SIZE; i++) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) {
                    emptyTile.push([i,j]);
                    zeros.push(i);
                }

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    emptyTile.push([i,j]);
                    
                    updatedTiles[index][j] = prevVal * 2;
                    if (prevVal * 2 === 2048) {
                        alert("You win!");
                    }

                    if (index !== prevIndex && !zeros.includes(prevIndex)) {
                        updatedTiles[prevIndex][j] = 0;
                        emptyTile.push([prevIndex, j]);
                    }

                    zeros.push(i);
                    prevVal = 0;
                    index = i-zeros.length;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = i;
                    index = i-zeros.length;
                    if (zeros.length !== 0) {
                        if (zeros.includes(index)) {
                            zeros.shift();
                            emptyTile.shift();
                        }
                        updatedTiles[index][j] = prevVal;
                        updatedTiles[i][j] = 0;
                        emptyTile.push([i,j]);
                        zeros.push(i);
                    }
                }
            }
            //console.log(emptyTile);
            emptyTile.forEach(element => {
                emptyTiles.push(element);    
            });
            
        }
        //console.log(emptyTiles);

        if (emptyTiles.length === 0) {
            /// TODO: Check if the tiles are not movable
            alert("You Loose");
        }
        else {
            let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            updatedTiles[newTile[0]][newTile[1]] = this.getRandomTileValue();
        }
        this.setState({tiles: updatedTiles});
    }

    shiftDown = () => {
        let updatedTiles = [...this.state.tiles];
        let emptyTiles = [];

        for (let j=0; j<GRID_SIZE; j++) {
            let zeros = updatedTiles[GRID_SIZE-1][j] === 0 ? [GRID_SIZE-1] : [];
            let index = GRID_SIZE-1;
            let prevIndex = GRID_SIZE-1;
            let prevVal = updatedTiles[GRID_SIZE-1][j];
            let emptyTile = updatedTiles[GRID_SIZE-1][j] === 0 ? [[GRID_SIZE-1,j]] : [];
            
            for (let i=GRID_SIZE-2; i>=0; i--) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) {
                    emptyTile.push([i,j]);
                    zeros.push(j);
                }

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    emptyTile.push([i,j]);
                    
                    updatedTiles[index][j] = prevVal * 2;
                    if (prevVal * 2 === 2048) {
                        alert("You win!");
                    }

                    if (index !== prevIndex && !zeros.includes(prevIndex)) {
                        updatedTiles[prevIndex][j] = 0;
                        emptyTile.push([prevIndex,j]);
                    }

                    zeros.push(i);
                    prevVal = 0;
                    index = i+zeros.length;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = i;
                    index = i+zeros.length;
                    if (zeros.length !== 0) {
                        if (zeros.includes(index)) {
                            zeros.shift();
                            emptyTile.shift();
                        }
                        updatedTiles[index][j] = prevVal;
                        updatedTiles[i][j] = 0;
                        emptyTile.push([i,j]);
                        zeros.push(i);
                    }
                }
            }
            //console.log(emptyTile);
            emptyTile.forEach(element => {
                emptyTiles.push(element);    
            });
            
        }
        //console.log(emptyTiles);

        if (emptyTiles.length === 0) {
            /// TODO: Check if the tiles are not movable
            alert("You Loose");
        }
        else {
            let newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            updatedTiles[newTile[0]][newTile[1]] = this.getRandomTileValue();
        }
        this.setState({tiles: updatedTiles});
    }
    

    render () {
        //let tiles = {...this.state.tiles};
        //console.log(tiles);

        // create 4x4 board filled with 0s
        //let newBoard = Array(4).fill(0).map(row => new Array(4).fill(0));        

        
        return (
            <div
                tabIndex="0"
                onKeyDown={this.onKeyDownHanlder}>
                
                <table>
                    <tbody>
                        {this.state.tiles.map((items, index) => {
                            return (
                            <tr>
                                {items.map((subItems, sIndex) => {
                                    return <th className={"th"+subItems}> {subItems===0? null:subItems} </th>;
                                })}
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tiles;