import {Component,} from '@nova-engine/ecs';
import {LaserWeapon} from '@/engine/class/laserWeapon';

class LoadoutComponent implements Component {
    public static tag = 'LoadoutComponent';


    private _weapons: LaserWeapon[] = [];


    public get weapons(): LaserWeapon[] {
        return this._weapons;
    }

    public set weapons(value: LaserWeapon[]) {
        this._weapons = value;
    }
}

export {LoadoutComponent}
