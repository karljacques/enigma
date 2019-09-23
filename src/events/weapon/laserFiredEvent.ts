import {Vector3} from 'three';

interface LaserFiredEvent {
    source: Vector3;
    destination: Vector3;
    colour: number;
}

export {LaserFiredEvent};
