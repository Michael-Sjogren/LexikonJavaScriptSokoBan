import Vector2 from "./vector2.js";

export default class MovableEntity 
{

    constructor(position , cellId)
    {
        // move to spawnpoint on creation
        this.moveTo(position);
        this.cellId = cellId;
    }

    getCellId = () =>
    {
        return this.cellId;
    }

    moveTo = (wordPos) => {
        this.position = new Vector2(wordPos.x , wordPos.y);
    }
}