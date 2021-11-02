export default class Vector2
{
    constructor(x,y)
    {
        if ( typeof x !== 'number') { 
            throw new TypeError("X was not a number");
        }
        if (typeof y !== 'number') {
            throw new TypeError("Y was not a number"); 
        }
        this.x = x;
        this.y = y;
    }
}