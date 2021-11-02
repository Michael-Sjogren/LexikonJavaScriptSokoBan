import Block from './block.js';
import Tile from './tile.js';
import { TileTypes } from '../sokoban-data.js';
import Player from './player.js';
import Vector2 from './vector2.js';

export default class TileMap
{
    
    constructor(mapGrid , tileSize ,gameContainer)
    {
        this.gameContainer = gameContainer;
        this.tileSize = tileSize;
        this.mapGrid = mapGrid;

        this.mapSize = new Vector2(
            this.mapGrid[0].length,
            this.mapGrid.length
        );
        gameContainer.style = `min-width:${this.mapSize.x * this.tileSize.x}px;min-height:${this.mapSize.y* this.tileSize.y}px;`;
        this.tiles = {};
        this.goals = [];
        this.blocks = [];
        this.player = null;
        this.createMap();
    }

    getGoals = () => {
        return this.goals;
    }

    getBlocks = () => {
        return this.blocks;
    }

    getPlayer = () => {
        return this.player;
    }

    createMap = () => {
        const rows = this.mapSize.y;
        const columns = this.mapSize.x;
        // loop over the whole map
        for(let row = 0; row < rows; row++)
        {
            let rowData = this.mapGrid[row];
            let rowContainer = document.createElement('div');
            rowContainer.className = "row";
            rowContainer.style = `height:${this.tileSize.y}px;`;
            for(let col = 0; col < columns; col++)
            {
                // add the tile to the tilemap
                const tilePos = new Vector2(col * this.tileSize.x , row * this.tileSize.y);
                const tileType = rowData[col][0];
                const cellId = this.addTile(tilePos ,tileType);
                if (tileType === TileTypes.block)
                {
                    this.blocks.push(new Block(tilePos,cellId));
                }
                else if(tileType === TileTypes.goal)
                {
                    this.goals.push(cellId);
                }
                else if(tileType === TileTypes.player)
                {
                    this.player = new Player(tilePos , cellId);
                }
                // creating the html elements and setting classes and id attributes
                let tile = document.createElement('div');
                tile.className = `tile ${TileTypes[tileType]}`;
                tile.style = `width:${this.tileSize.x}px; height:${this.tileSize.y}px;`;
                tile.id = cellId;
                rowContainer.appendChild(tile);
            }
            this.gameContainer.appendChild(rowContainer);
        }
    };

    renderMap = () => {
     
        for(let row = 0; row < this.mapSize.y; row++){
            for(let col = 0; col < this.mapSize.x; col++)
            {
                const worldPos = new Vector2(col * this.tileSize.x , row * this.tileSize.y);
                const cellId = this.getCellIdFromWorldPos(worldPos);
                const tile = this.getTile(cellId);
                const element = document.getElementById(cellId);
                element.className = `tile ${TileTypes[tile.tileType]}`;
            }
        }
    }

    getAllBlocks = () => {
        return []; 
    }
    
    setTileType = (worldPos , tileType) =>
    {
        if ( (!tileType in TileTypes) === true) return;
        const cellId = this.getCellIdFromWorldPos(worldPos);
        this.tiles[cellId].tileType = tileType;
    }

    isCellIdValid(cellId)
    {
        return (cellId in this.tiles) === true;
    }
    
    addTile = (pos , tileType) => {
        let cellId = this.getCellIdFromWorldPos(pos);
        this.tiles[cellId] = new Tile(this.tileSize , pos , tileType);
        return cellId;
    }
    
    isTileWalkable = (worldPos) =>
    {
        const cellId = this.getCellIdFromWorldPos(worldPos);
        if (!this.isCellIdValid(cellId)) return false;
        return !this.isTileWall(worldPos);
    }

    isTileBlock = (wordPos) => 
    {
        const cellId = this.getCellIdFromWorldPos(wordPos);
        if (!this.isCellIdValid(cellId)) return false;
        const type = this.tiles[cellId].tileType;
        return type === TileTypes.block;
    }

    isTileWall = (wordPos) => {
        const cellId = this.getCellIdFromWorldPos(wordPos);
        if (!this.isCellIdValid(cellId)) return;
        const type = this.tiles[cellId].tileType;
        return type === TileTypes.wall;
    }

    // just concatinates x and y position with a space between as an id
    getCellIdFromWorldPos = (worldPos) => {
        return  `x${worldPos.x}y${worldPos.y}`;
    }

    getTile = (cellId) => {
        const id = cellId;
        if (id in this.tiles)
        {
            return this.tiles[id];
        }
        return null;
    }

    getTileAtWorldPos = (worldPos) => {
        const id = this.getCellIdFromWorldPos(worldPos);
        if (id in this.tiles)
        {
            return this.tiles[id];
        }
        return null;
    }
} 