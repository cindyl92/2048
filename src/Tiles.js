import React, { Component } from 'react';
import './Tiles.css';

const GRID_SIZE = 4;

class Tiles extends Component {
    state = {
        tiles: [
            [0,16,4,2],
            [16,2,8,32],
            [0,0,4,4],
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
        let tiles = [...this.state.tiles];

        for (let i=GRID_SIZE-1; i>=0; i--) {
            let zeros = 0;
            /// SHIFT ALL TO THE RIGHT 
            for (let j=GRID_SIZE-1; j>=0; j--) {
                if (tiles[i][j] === tiles[i][j-1]) {
                    tiles[i][j] *= 2;
                    tiles[i][j-1] = 0;
                }

                if (tiles[i][j] === 0) zeros++;
                else {
                    if (zeros !== 0) {
                        tiles[i][j+zeros] = tiles[i][j];
                        tiles[i][j] = 0;
                    } 
                }
            }
        }
        this.setState({tiles: tiles});
    }

    shiftLeft = () => {
        let updatedTiles = [...this.state.tiles];
        let emptyTiles = [];

        for (let i=0; i<GRID_SIZE; i++) {
            /*let zeros = 0;
            /// SHIFT ALL TO THE LEFT 
            for (let j=0; j<GRID_SIZE; j++) {
                if (tiles[i][j] === 0) zeros++;
                else if (zeros !== 0) {
                    tiles[i][j-zeros] = tiles[i][j];
                    tiles[i][j] = 0; 
                }

            }
            zeros = 0;
            for (let j=0; j<GRID_SIZE-1; j++) {
                if (tiles[i][j] === tiles[i][j+1]) {
                    tiles[i][j] *= 2;
                    tiles[i][j+1] = 0;
                    
                    for (let k=j+1; k<GRID_SIZE-1; k++) {
                        let temp = tiles[i][k];
                        tiles[i][k] = tiles[i][k+1];
                        tiles[i][k+1] = temp;
                    }
                }

            }*/
            console.log(updatedTiles[i]);
            // 0의 갯수
            let zeros = updatedTiles[i][0] === 0? 1:0;
            
            // 숫자 있는 곳
            let prevIndex = 0;
            
            // 이전 value
            let prevVal = updatedTiles[i][0];
            
            let index = 0;

            for (let j=1; j<GRID_SIZE; j++) {
                // 0일때
                if (updatedTiles[i][j] === 0) {
                    
                    zeros++;
                    console.log('zeros = '+zeros);
                }
                // 이전 밸류와 같을 때
                else if (updatedTiles[i][j] === prevVal) {
                    
                    //if (prevIndex !== j-1) updatedTiles[i][j-1] = 0;
                    updatedTiles[i][j] = 0;
                    updatedTiles[i][prevIndex] = 0;
                    updatedTiles[i][index] = prevVal * 2;
                    zeros++;
                    prevVal = 0;
                    index = j-zeros;
                    console.log('이전 밸류와 같을때 인덱스 = '+index);
                }
                // 이전 밸류와 다를 때
                else if (updatedTiles[i][j] !== prevVal) {
                    prevVal = updatedTiles[i][j];
                    prevIndex = j;
                    index = j-zeros;
                    if (zeros !== 0) {
                        updatedTiles[i][index] = prevVal;
                        updatedTiles[i][j] = 0;
                    }
                    
                    console.log('이전 밸류와 다를 때 인덱스 = '+index);
                }
                
            }
        }
        this.setState({tiles: updatedTiles});
    }

    shiftUp = () => {
        let tiles = [...this.state.tiles];

        for (let j=0; j<GRID_SIZE; j++) {
            let zeros = 0;
            /// SHIFT ALL TO THE LEFT 
            for (let i=0; i<GRID_SIZE; i++) {
                if (tiles[i][j] === 0) zeros++;
                else {
                    if (zeros !== 0) {
                        tiles[i-zeros][j] = tiles[i][j];
                        tiles[i][j] = 0;
                    } 
                }
            }
        }
        this.setState({tiles: tiles});
    }

    shiftDown = () => {
        let tiles = [...this.state.tiles];

        for (let j=GRID_SIZE-1; j>=0; j--) {
            let zeros = 0;
            /// SHIFT ALL TO THE RIGHT 
            for (let i=GRID_SIZE-1; i>=0; i--) {
                if (tiles[i][j] === 0) zeros++;
                else {
                    if (zeros !== 0) {
                        tiles[i+zeros][j] = tiles[i][j];
                        tiles[i][j] = 0;
                    } 
                }
            }
        }
        this.setState({tiles: tiles});
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
                                    return <th key={index+sIndex}> {subItems} </th>;
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