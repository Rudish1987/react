const logObject = [];
export default function Log({activePlayer, rowSelect, colSelect}) {
    if (rowSelect != undefined && colSelect != undefined) {
        logObject.push({'PlayerName': activePlayer, 'rowSelect': rowSelect, 'colSelect': colSelect});
    }
    return (
        <ol id="log">
            {logObject.map((turn ,turnIndex)=><li key={turnIndex}>{turn.PlayerName} selected {turn.rowSelect},{turn.colSelect}</li>)}
        </ol>
    );
}