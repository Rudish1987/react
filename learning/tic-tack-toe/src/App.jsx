import Player from "./components/Player.jsx";
import Gameboard  from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import {useState} from "react";

const basicSymbols =['G','H']
function App() {
    const [activePlayer, setActivePlayer] = useState(basicSymbols[0]);
    const [rowSelect ,setRowselect] =useState()
    const [colSelect ,setColselect] =useState()
    const getActivePlayer = (rowIndex,colIndex) => {
        setActivePlayer((checkActive) => checkActive === basicSymbols[0] ? basicSymbols[1] : basicSymbols[0]);
        setRowselect(rowIndex);
        setColselect(colIndex);
    }
    return (
        <main>
            <div id="game-container">
                <ol id="players" className='highlight-player'>
                    <Player playername="Player 1" symbol={basicSymbols[0]} active={activePlayer ===basicSymbols[0]}/>
                    <Player playername="Player 2" symbol={basicSymbols[1]} active={activePlayer ===basicSymbols[1]}/>
                </ol>
                <Gameboard getActivePlayer={getActivePlayer} activePlayerSymbol={activePlayer}/>
            </div>
            <Log activePlayer={activePlayer===basicSymbols[0]?basicSymbols[1]:basicSymbols[0]} rowSelect={rowSelect} colSelect={colSelect}/>
        </main>
    )
}

export default App
