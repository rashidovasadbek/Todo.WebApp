import type { Guid } from "guid-typescript";
import {data} from "autoprefixer";

export class TodoItem {
    id!: Guid;
    title!: string;
    isDone!: boolean;
    isFavorite!: boolean;
    dueTime!: Date;
    reminderTime!: Date;

    constructor() {
        this.isDone = false;
        this.isFavorite = false;
        const now = new Date();
        this.dueTime = new Date(now.getTime());
        this.dueTime.setHours(now.getHours() + 3);
        this.reminderTime = new Date(now.getTime());
        this.reminderTime.setHours(now.getHours() + 1);
    }

}