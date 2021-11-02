import Player from './classes/player.js';
import TileMap from './classes/tilemap.js';
import Vector2 from './classes/vector2.js';
import Block from './classes/block.js';
import * as SokobanData from './sokoban-data.js';

// the size of each tile; width and height.
const gameContainer = document.getElementById("game");
const tileSize = new Vector2(32 ,32);
const rows = SokobanData.TileMap01.mapGrid.length;
const columns = SokobanData.TileMap01.mapGrid[0].length;
const tileMap = new TileMap(tileSize,new Vector2(columns,rows));
const blocks = [];
const goals = [];
var player = null
const keyBindings = {
    Up:['ArrowUp','w'],
    Down:['ArrowDown','s'],
    Right:['ArrowRight','d'],
    Left:['ArrowLeft','a'],
    Restart:['r']
}

let createMap = () => {
    for(let row = 0; row < rows; row++)
    {
        let rowData = SokobanData.TileMap01.mapGrid[row];
        let rowContainer = document.createElement('div');
        rowContainer.className = "row";
        rowContainer.style = `height:${tileSize.y}px;`;
        for(let col = 0; col < columns; col++)
        {
            // add the tile to the tilemap
            let value = rowData[col];
            let tilePos = new Vector2(col * tileSize.x , row * tileSize.y);
            let tileType = value[0];
            const cellId = tileMap.addTile(tilePos ,tileType);
            if (tileType === SokobanData.TileTypes.block)
            {
                blocks.push(new Block(tilePos,cellId));
            }
            else if(tileType === SokobanData.TileTypes.goal)
            {
                goals.push(cellId);
            }
            else if(tileType === SokobanData.TileTypes.player)
            {
                player = new Player(tilePos , cellId);
            }
            // creating the html elements and setting classes and id attributes
            let tile = document.createElement('div');
            tile.className = `tile ${SokobanData.TileTypes[tileType]}`;
            tile.style = `width:${tileSize.x}px; height:${tileSize.y}px;`;
            tile.id = cellId;
            rowContainer.appendChild(tile);
        }
        gameContainer.appendChild(rowContainer);
    }
};

let renderMap = () => {
     
    for(let row = 0; row < rows; row++){
        for(let col = 0; col < columns; col++)
        {
            const worldPos = new Vector2(col * tileSize.x , row * tileSize.y);
            const cellId = tileMap.getCellIdFromWorldPos(worldPos);
            const tile = tileMap.getTile(cellId);
            const element = document.getElementById(cellId);
            element.className = `tile ${SokobanData.TileTypes[tile.tileType]}`;
        }
    }
}

let resetGame = () =>
{
    window.location.reload();
}
let isGameWon = () => 
{
    return blocks.every(e => goals.includes(e.cellId));
}
createMap();


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    gameContainer.focus();

    const key = event.key;
    let moveDir = new Vector2(0,0);
    if (keyBindings.Restart.includes(key))
    {
        resetGame();
        return;
    }
    if(keyBindings.Up.includes(key)){
        moveDir.y = -1;
    }else if(keyBindings.Down.includes(key))
    {
        moveDir.y = 1;
    }
    else if(keyBindings.Right.includes(key))
    {
        moveDir.x = 1;
    }
    else if(keyBindings.Left.includes(key))
    {
        moveDir.x = -1;
    }
    else
    {
        return;
    }
    
    const newPlayerPos = new Vector2(moveDir.x * tileSize.x + player.position.x , moveDir.y * tileSize.y + player.position.y);
    //console.log(`player: ${player.position.x} ${player.position.y} to: => ${moveWordPos.x} ${moveWordPos.y}`);
    let playerCanMove = true;
    if(tileMap.isTileWalkable(newPlayerPos))
    {
        if (tileMap.isTileBlock(newPlayerPos))
        {
            const cellId = tileMap.getCellIdFromWorldPos(newPlayerPos);
            const block = blocks.find( e => e.cellId === cellId);
            const newBlockPos = new Vector2( block.position.x + tileSize.x * moveDir.x , block.position.y + tileSize.y * moveDir.y )
            if (!tileMap.isTileBlock(newBlockPos) && !tileMap.isTileWall(newBlockPos) )
            {
                
                tileMap.setTileType(block.position , SokobanData.TileTypes.player);
                block.moveTo(newBlockPos);
                tileMap.setTileType(block.position , SokobanData.TileTypes.block );
                block.cellId = tileMap.getCellIdFromWorldPos(block.position);
            }
            else
            {
                playerCanMove = false;
            }
        }
        const prevId = tileMap.getCellIdFromWorldPos(player.position);
        console.log(prevId);
        if (playerCanMove)
        {
            if (goals.includes(prevId)) {
                tileMap.setTileType(player.position , SokobanData.TileTypes.goal);
            }
            else
            {
                tileMap.setTileType(player.position , SokobanData.TileTypes.empty);
            }
            player.moveTo(newPlayerPos);
            const cellId = tileMap.getCellIdFromWorldPos(player.position);
            tileMap.setTileType(player.position , SokobanData.TileTypes.player);
            player.cellId = cellId;
        }

        renderMap();
        if(isGameWon())
        {
            alert("Congratulations you win!");
            resetGame();
        }
    }

});