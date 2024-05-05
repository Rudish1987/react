import {useState} from "react";

export default function Player({playername, symbol ,active}) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName ,setPlayerName] =useState(playername);
    const handleEditClick = () => {
        setIsEditing((editing) => !editing)
    }
    const handlePlayername=(event)=>{
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = "Edit";
    if
    (isEditing === true) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handlePlayername}/>;
        buttonCaption = "Save"
    }

    return (
        <li className={active?'active':''}>
              <span className="player">
                {editablePlayerName}
                  <span className="player-symbol">{symbol}</span>
              </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    );
}