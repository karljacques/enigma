import {FlightComputerState} from '@/engine/state/flightComputer/FlightComputerState';
import {Entity} from '@nova-engine/ecs';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import {Vector3} from 'three';
import {FlightComputerStationaryState} from '@/engine/state/flightComputer/FlightComputerStationaryState';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';

class FlightComputerTerminatingVelocityState implements FlightComputerState {
    public update(entity: Entity, delta: number): FlightComputerState | null {

        const velocityComponent = entity.getComponent(VelocityComponent);

        const velocity = velocityComponent.getVelocity();

        if (velocity.length() < 0.01) {
            return new FlightComputerStationaryState();
        }

        return null;
    }

    public onEnter(entity: Entity): void {
        console.log('onEnter FlightComputerTerminatingVelocityState');
        const velocityComponent = entity.getComponent(VelocityComponent);

        const velocity = velocityComponent.getVelocity();
        const requiredThrustNormal = velocity.multiplyScalar(-1).normalize();

        velocityComponent.setAcceleration(requiredThrustNormal);
    }

    public onExit(entity: Entity): void {
        console.log('onExit FlightComputerTerminatingVelocityState');
        const velocityComponent = entity.getComponent(VelocityComponent);

        velocityComponent.setAcceleration(new Vector3(0, 0, 0));

        const flightComputer = entity.getComponent(FlightComputerComponent);
        if (flightComputer.hasTarget()) {
            const target = flightComputer.getTarget();
            const position = entity.getComponent(PositionComponent).getPosition();

            if (position.distanceTo(target) < 0.1) {
                flightComputer.setTarget(null);
            }
        }
    }

    public handleNewTarget(): FlightComputerState | null {
        return null;
    }

}

export {FlightComputerTerminatingVelocityState};
