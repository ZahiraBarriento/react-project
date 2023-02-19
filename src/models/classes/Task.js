import { LEVELS } from "../Levels";


export class Task {
    name = '';
    description = '';
    completed = false;
    level = LEVELS.Normal;

    constructor(name, description, completed, level){
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.level = level;
    }
}