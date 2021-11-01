import Vector2 from "./vector2.js";

 
export default class Tile {
    
    constructor(tileSize,tilePos,tileType){
        if (typeof(tileSize) !== Vector2) throw "tileSize was not a vector2";
        if (typeof(tilePos) !== Vector2) throw "tilePos was not a vector2";
        if (typeof(tileType) !== String) throw "tilePos was not a vector2";

        this.tilePos = tilePos;
        this.tileSize = tileSize;
        this.tileType = tileType;
    }
}
