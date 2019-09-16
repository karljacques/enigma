import {FlightComputerState} from '@/engine/state/flightComputer/FlightComputerState';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {FlightComputerAcceleratingState} from '@/engine/state/flightComputer/FlightComputerAcceleratingState';
import {Entity} from '@nova-engine/ecs';

class FlightComputerStationaryState implements FlightComputerState {
    public onEnter(entity: Entity): void {
        console.log('onEnter FlightComputerStationaryState');
    }

    public onExit(entity: Entity): void {
        console.log('onExit FlightComputerStationaryState');
    }

    public update(entity: Entity, delta: number): FlightComputerState | null {
        if (entity.getComponent(FlightComputerComponent).hasTarget()) {
            return new FlightComputerAcceleratingState();
        }

        return null;
    }

    public handleNewTarget(): FlightComputerState | null {
        return new FlightComputerAcceleratingState();
    }

}

export {FlightComputerStationaryState};
