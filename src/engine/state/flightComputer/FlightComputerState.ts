import {Entity} from '@nova-engine/ecs';

interface FlightComputerState {
    onEnter(entity: Entity): void;

    onExit(entity: Entity): void;

    update(entity: Entity, delta: number): FlightComputerState | null;

    handleNewTarget(): FlightComputerState | null;
}

export {FlightComputerState};
