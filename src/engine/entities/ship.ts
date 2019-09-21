import {Entity} from '@nova-engine/ecs';

class Ship extends Entity {
    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}

export {Ship};
