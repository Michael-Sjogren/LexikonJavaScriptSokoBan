import MovableEntity from './movable-entity.js';
export default class Block extends MovableEntity
{
    constructor(position,cellId)
    {
        super(position , cellId)
    }
}