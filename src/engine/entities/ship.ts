import {Entity} from '@nova-engine/ecs';

class Ship extends Entity {
    public get mass(): number {
        return this._mass;
    }

    public set mass(value: number) {
        this._mass = value;
    }

    public get enginePower(): number {
        return this._enginePower;
    }

    public set enginePower(value: number) {
        this._enginePower = value;
    }
    public get team(): number {
        return this._team;
    }

    public set team(value: number) {
        this._team = value;
    }

    private _name: string = '';
    private _team: number = 1;

    private _mass: number        = 1000;
    private _enginePower: number = 1000;



    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}

export {Ship};
