import {Component} from '@nova-engine/ecs';

class HealthComponent implements Component {
    private _hull: number    = 100;
    private _shields: number = 100;


    public get hull(): number {
        return this._hull;
    }

    public set hull(value: number) {
        this._hull = value;
    }

    public get shields(): number {
        return this._shields;
    }

    public set shields(value: number) {
        this._shields = value;
    }

    public damage(value: number) {
        if (this.shields < value) {
            value -= this.shields;
            this.shields = 0;
        } else {
            this.shields -= value;
        }

        this.hull -= value;

    }
}

export {HealthComponent};
