import {Component} from '@nova-engine/ecs';
import {Vector3} from 'three';

class FlightComputerComponent implements Component {
    protected target: Vector3 | null = null;

    public hasTarget(): boolean {
        return this.target !== null;
    }

    public getTarget(): Vector3 {
        if (!this.target) {
            throw new Error('Flight Computer has no target');
        }

        return this.target;
    }

    public setTarget(target: Vector3 | null): void {
        if (target === null) {
            this.target = null;
            return;
        }

        this.target = new Vector3().copy(target);
    }
}

export {FlightComputerComponent};
