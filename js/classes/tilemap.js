import Vector2 from './vector2.js';
import Tile from './tile.js';

export default class TileMap
{
    
    constructor(tileSize,mapSize, tileTypes)
    {
        this.tileTypes = tileTypes
        this.tileSize = tileSize
        this.mapSize = mapSize
        this.tiles = []
    }

    addTile = (x , y , tileType) => {
        this.tiles.push(new Tile(this.tileSize , new Vector2(x, y) , tileType));
    }
    
    getTileAtPos = (pos) => {
        
    }
} 