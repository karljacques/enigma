import {Component} from '@nova-engine/ecs';
import {Vector3} from 'three';

class VelocityComponent implements Component {
    public tag = 'VelocityComponent';

    protected velocity: Vector3 = new Vector3(0.0, 0, 0);
    protected acceleration: Vector3 = new Vector3(0.0, 0.0, 0.0);

    public getVelocity(): Vector3 {
        return new Vector3().copy(this.velocity);
    }

    public setVelocity(velocity: Vector3): void {
        this.velocity.copy(velocity);
    }

    public getAcceleration(): Vector3 {
        return new Vector3().copy(this.acceleration);
    }

    public setAcceleration(velocity: Vector3): void {
        this.acceleration.copy(velocity);
    }
}

export {VelocityComponent};
