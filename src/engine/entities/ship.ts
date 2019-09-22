import {Entity} from '@nova-engine/ecs';

class Ship extends Entity {
    public get team(): number {
        return this._team;
    }

    public set team(value: number) {
        this._team = value;
    }

    private _name: string = '';
    private _team: number = 1;


    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}

export {Ship};
