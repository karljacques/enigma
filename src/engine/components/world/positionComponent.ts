import {Component} from '@nova-engine/ecs';
import {Vector3} from 'three';

class PositionComponent implements Component {
    public static tag = 'PositionComponent';

    private position: Vector3 = new Vector3();

    public getPosition(): Vector3 {
        return new Vector3().copy(this.position);
    }

    public setPosition(value: Vector3) {
        this.position.copy(value);
    }

    public setPositionReference(position: Vector3): void {
        this.position = position;
    }

    public getPositionReference(): Vector3 {
        return this.position;
    }
}

export {PositionComponent};
