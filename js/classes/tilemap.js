import Vector2 from './vector2.js';
import Tile from './tile.js';
import { TileTypes } from '../sokoban-data.js';
export default class TileMap
{
    
    constructor(tileSize,mapSize)
    {
        this.tileSize = tileSize
        this.mapSize = mapSize
        this.tiles = {}
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
        const isWall = this.isTileWall(worldPos);
        //const isBlock = this.tiles[cellId].tileType === TileTypes.empty;
        return !isWall;
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
        return  `${worldPos.x} ${worldPos.y}`;
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