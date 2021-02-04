import React, { Component } from 'react';
import './Tiles.css';

const GRID_SIZE = 4;

class Tiles extends Component {
    state = {
        tiles: [
            [2,0,2,2],
            [2,0,0,2],
            [0,8,4,4],
            [0,2,0,2]
        ]
    }

    onKeyDownHanlder = (e) => {
        if (e.key === "ArrowRight") {
            //alert("->");
            this.shiftRight();
        }
        if (e.key === "ArrowLeft") {
            //alert("<-");
            this.shiftLeft();
        }
        if (e.key === "ArrowUp") {
            //alert("^");
            this.shiftUp();
        }
        if (e.key === "ArrowDown") {
            //alert("v");
            this.shiftDown();
        }
    }

    shiftRight = () => {
        let updatedTiles = [...this.state.tiles];
        //let emptyTiles = [];

        for (let i=0; i<GRID_SIZE; i++) {
            let zeros = updatedTiles[i][GRID_SIZE-1] === 0? 1:0;
            let index = GRID_SIZE-1;
            let prevIndex = GRID_SIZE-1;
            let prevVal = updatedTiles[i][GRID_SIZE-1];
            
            for (let j=GRID_SIZE-2; j>=0; j--) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) zeros++;

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    updatedTiles[i][prevIndex] = 0;
                    updatedTiles[i][index] = prevVal * 2;
                    zeros++;
                    prevVal = 0;
                    index = j+zeros;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = j;
                    index = j+zeros;
                    if (zeros !== 0) {
                        updatedTiles[i][index] = prevVal;
                        updatedTiles[i][j] = 0;
                    }
                }
            }
        }
        this.setState({tiles: updatedTiles});
    }

    shiftLeft = () => {
        let updatedTiles = [...this.state.tiles];
        //let emptyTiles = [];

        for (let i=0; i<GRID_SIZE; i++) {
            let zeros = updatedTiles[i][0] === 0? 1:0;
            let index = 0;
            let prevIndex = 0;
            let prevVal = updatedTiles[i][0];
            
            for (let j=1; j<GRID_SIZE; j++) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) zeros++;

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    updatedTiles[i][prevIndex] = 0;
                    updatedTiles[i][index] = prevVal * 2;
                    zeros++;
                    prevVal = 0;
                    index = j-zeros;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = j;
                    index = j-zeros;
                    if (zeros !== 0) {
                        updatedTiles[i][index] = prevVal;
                        updatedTiles[i][j] = 0;
                    }
                }
            }
        }
        this.setState({tiles: updatedTiles});
    }

    shiftUp = () => {
        let updatedTiles = [...this.state.tiles];
        //let emptyTiles = [];

        for (let j=0; j<GRID_SIZE; j++) {
            let zeros = updatedTiles[0][j] === 0? 1:0;
            let index = 0;
            let prevIndex = 0;
            let prevVal = updatedTiles[0][j];
            
            for (let i=1; i<GRID_SIZE; i++) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) zeros++;

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    updatedTiles[prevIndex][j] = 0;
                    updatedTiles[index][j] = prevVal * 2;
                    zeros++;
                    prevVal = 0;
                    index = i-zeros;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = i;
                    index = i-zeros;
                    if (zeros !== 0) {
                        updatedTiles[index][j] = prevVal;
                        updatedTiles[i][j] = 0;
                    }
                }
            }
        }
        this.setState({tiles: updatedTiles});
    }

    shiftDown = () => {
        let updatedTiles = [...this.state.tiles];
        //let emptyTiles = [];

        for (let j=0; j<GRID_SIZE; j++) {
            let zeros = updatedTiles[GRID_SIZE-1][j] === 0? 1:0;
            let index = GRID_SIZE-1;
            let prevIndex = GRID_SIZE-1;
            let prevVal = updatedTiles[GRID_SIZE-1][j];
            
            for (let i=GRID_SIZE-2; i>=0; i--) {
                // When the element is 0
                if (updatedTiles[i][j] === 0) zeros++;

                // When the element matches with previous value
                else if (updatedTiles[i][j] === prevVal) {
                    updatedTiles[i][j] = 0;
                    updatedTiles[prevIndex][j] = 0;
                    updatedTiles[index][j] = prevVal * 2;
                    zeros++;
                    prevVal = 0;
                    index = i+zeros;
                }
                // When the element has different value from previous value
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = i;
                    index = i+zeros;
                    if (zeros !== 0) {
                        updatedTiles[index][j] = prevVal;
                        updatedTiles[i][j] = 0;
                    }
                }
            }
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
                                    return <th key={index+sIndex}> {subItems===0? null:subItems} </th>;
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