export default class Vector2
{
    constructor(x,y)
    {
        if (isNaN(x)) throw "Not a number";
        if (isNaN(y)) throw "Not a number"; 
        this.x = x;
        this.y = y;
    }
}