import {FlightComputerState} from '@/engine/state/flightComputer/FlightComputerState';
import {Entity} from '@nova-engine/ecs';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import {FlightComputerTerminatingVelocityState} from '@/engine/state/flightComputer/FlightComputerTerminatingVelocityState';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {Ship} from '@/engine/entities/ship';

class FlightComputerAcceleratingState implements FlightComputerState {
    public onEnter(entity: Ship): void {
        console.log('onEnter FlightComputerAcceleratingState');
        const target   = entity.getComponent(FlightComputerComponent).getTarget();
        const position = entity.getComponent(PositionComponent).getPosition();

        const acceleration = entity.enginePower / entity.mass;
        const thrustVector = target.sub(position).normalize().multiplyScalar(acceleration);

        entity.getComponent(VelocityComponent).setAcceleration(thrustVector);

    }

    public onExit(entity: Entity): void {
        console.log('onExit FlightComputerAcceleratingState');
    }

    public update(entity: Ship, delta: number): FlightComputerState | null {
        const target   = entity.getComponent(FlightComputerComponent).getTarget();
        const position = entity.getComponent(PositionComponent).getPosition();
        const velocity = entity.getComponent(VelocityComponent).getVelocity();

        const displacement                 = target.distanceTo(position);

        const acceleration = entity.enginePower / entity.mass;

        const maxThrustInOppositeDirection = (target.sub(position)).normalize().multiplyScalar(acceleration);

        const displacementRequiredToStop = velocity.lengthSq() / (2 * maxThrustInOppositeDirection.length());
        if (displacementRequiredToStop >= displacement) {
            return new FlightComputerTerminatingVelocityState();
        }

        return null;
    }

    public handleNewTarget(): FlightComputerState {
        return new FlightComputerTerminatingVelocityState();
    }

}

export {FlightComputerAcceleratingState};
