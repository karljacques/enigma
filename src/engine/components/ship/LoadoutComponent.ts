import {Component,} from '@nova-engine/ecs';
import {Weapon} from '@/engine/class/weapon';

class LoadoutComponent implements Component {
    private _weapons: Weapon[] = [];


    public get weapons(): Weapon[] {
        return this._weapons;
    }

    public set weapons(value: Weapon[]) {
        this._weapons = value;
    }
}

export {LoadoutComponent}
