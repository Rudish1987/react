import {useState} from "react";
import {WINNING_COMBINATIONS} from "../winninh-combination.jsx"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
let count =0 ;
export default function Gameboard({getActivePlayer, activePlayerSymbol}) {
    const [gameboard, setGameBoard] = useState(initialGameBoard);
    const handleClick = (rowIndex, colIndex) => {
        setGameBoard((prevState) => {
            const updatePrevstate = [...prevState];
            updatePrevstate[rowIndex][colIndex] = activePlayerSymbol
            return updatePrevstate;
        })
        count = count+1;
        getActivePlayer(rowIndex, colIndex);
    }
    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameboard[combination[0].row][combination[0].column]
        const seCondSymbol = gameboard[combination[1].row][combination[1].column]
        const thirdSymbol = gameboard[combination[2].row][combination[2].column]
        console.log(firstSymbol +'----'+seCondSymbol+'-----'+thirdSymbol);
        if(firstSymbol && firstSymbol===seCondSymbol && firstSymbol===thirdSymbol)
        {
            alert(firstSymbol+ "Winner");
        }
    }
    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleClick(rowIndex, colIndex)} disabled={col != null}>{col}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>);
}