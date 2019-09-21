import {Raycaster, Vector2, Vector3} from 'three';

class WorldMouseEvent extends Event {

    constructor(type: string,
                protected _button: number,
                protected _position: Vector2,
                protected _intersect: Vector3,
                protected _raycaster: Raycaster,
    ) {
        super(type);
    }

    get raycaster(): Raycaster {
        return this._raycaster;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get intersect(): Vector3 {
        return this._intersect;
    }

    get button(): number {
        return this._button;
    }


}

export {WorldMouseEvent};
