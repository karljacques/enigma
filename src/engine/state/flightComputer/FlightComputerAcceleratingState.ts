import {FlightComputerState} from '@/engine/state/flightComputer/FlightComputerState';
import {Entity} from '@nova-engine/ecs';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import {FlightComputerTerminatingVelocityState} from '@/engine/state/flightComputer/FlightComputerTerminatingVelocityState';
import {RenderComponent} from '@/engine/components/render/renderComponent';

class FlightComputerAcceleratingState implements FlightComputerState {
    public onEnter(entity: Entity): void {
        console.log('onEnter FlightComputerAcceleratingState');
        const target   = entity.getComponent(FlightComputerComponent).getTarget();
        const position = entity.getComponent(PositionComponent).getPosition();

        const thrustVector = target.sub(position).normalize();
        entity.getComponent(VelocityComponent).setAcceleration(thrustVector);

    }

    public onExit(entity: Entity): void {
        console.log('onExit FlightComputerAcceleratingState');
    }

    public update(entity: Entity, delta: number): FlightComputerState | null {
        const target   = entity.getComponent(FlightComputerComponent).getTarget();
        const position = entity.getComponent(PositionComponent).getPosition();
        const velocity = entity.getComponent(VelocityComponent).getVelocity();

        const displacement                 = target.distanceTo(position);
        const maxThrustInOppositeDirection = (target.sub(position)).normalize();

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
