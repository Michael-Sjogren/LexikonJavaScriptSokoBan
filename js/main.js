
import TileMap from './classes/tilemap.js';
import Vector2 from './classes/vector2.js';

import * as SokobanData from './sokoban-data.js';

const gameContainer = document.getElementById("game");
const tileSize = new Vector2(32, 32);

const tileMap = new TileMap(SokobanData.TileMap01.mapGrid, tileSize, gameContainer);

const keyBindings = {
    Up: ['ArrowUp', 'w'],
    Down: ['ArrowDown', 's'],
    Right: ['ArrowRight', 'd'],
    Left: ['ArrowLeft', 'a'],
    Restart: ['r']
}

let resetGame = () => {
    window.location.reload();
}

let isGameWon = () => {
    // if all movable blocks exist in goals you win
    return tileMap.getBlocks().every(e => tileMap.getGoals().includes(e.cellId));
}

// main game event loop
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    gameContainer.focus();

    const key = event.key;
    const player = tileMap.getPlayer();
    const blocks = tileMap.getBlocks();
    const goals = tileMap.getGoals();
    const moveDir = new Vector2(0, 0);
    if (keyBindings.Restart.includes(key)) {
        resetGame();
        return;
    }
    if (keyBindings.Up.includes(key)) {
        moveDir.y = -1;
    } else if (keyBindings.Down.includes(key)) {
        moveDir.y = 1;
    }
    else if (keyBindings.Right.includes(key)) {
        moveDir.x = 1;
    }
    else if (keyBindings.Left.includes(key)) {
        moveDir.x = -1;
    }
    else {
        return;
    }

    const newPlayerPos = new Vector2(
        moveDir.x * tileSize.x + player.position.x,
        moveDir.y * tileSize.y + player.position.y
    );

    // check if player can move to desired position
    if (!tileMap.isTileWalkable(newPlayerPos)) return;


    // check if the desired position for player is a movable block
    const isABlock = tileMap.isTileBlock(newPlayerPos);
    if (isABlock) {
        const cellId = tileMap.getCellIdFromWorldPos(newPlayerPos);
        const block = blocks.find(e => e.cellId === cellId);
        const newBlockPos = new Vector2(block.position.x + tileSize.x * moveDir.x, block.position.y + tileSize.y * moveDir.y)
        // check if this movable block can be pushed in the desired direction
        const canPush = !tileMap.isTileBlock(newBlockPos) && !tileMap.isTileWall(newBlockPos);
        if (canPush) {

            tileMap.setTileType(block.position, SokobanData.TileTypes.player);
            block.moveTo(newBlockPos);
            tileMap.setTileType(block.position, SokobanData.TileTypes.block);
            block.cellId = tileMap.getCellIdFromWorldPos(block.position);
        }
        else 
        {
            // if you cant push the block infornt of you you wont be able to move
            return;
        }
    }

    const prevId = tileMap.getCellIdFromWorldPos(player.position);
    // this resets the tileType to goal if the player has walked over a goal tile on the players previous move
    if (goals.includes(prevId)) {
        tileMap.setTileType(player.position, SokobanData.TileTypes.goal);
    }
    // if not a goal tile reset to empty tile
    else {
        tileMap.setTileType(player.position, SokobanData.TileTypes.empty);
    }

    player.moveTo(newPlayerPos);
    const cellId = tileMap.getCellIdFromWorldPos(player.position);
    tileMap.setTileType(player.position, SokobanData.TileTypes.player);
    player.cellId = cellId;
    // re-rendering map only when player has moved
    tileMap.renderMap();


    // check win condition
    if (isGameWon()) {
        alert("Congratulations you win!");
        resetGame();
    }

});