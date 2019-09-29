import {Component, Entity} from '@nova-engine/ecs';
import {Vector3} from 'three';
import {FlightComputerState} from '@/engine/state/flightComputer/FlightComputerState';
import {FlightComputerTerminatingVelocityState} from '@/engine/state/flightComputer/FlightComputerTerminatingVelocityState';

class FlightComputerComponent implements Component {
    public static tag = 'FlightComputerComponent';

    protected target: Vector3 | null = null;
    protected entity!: Entity;

    protected state: FlightComputerState = new FlightComputerTerminatingVelocityState();

    public initialise(entity: Entity) {
        this.state.onEnter(entity);
        this.entity = entity;
    }

    public hasTarget(): boolean {
        return this.target !== null;
    }

    public getTarget(): Vector3 {
        if (!this.target) {
            throw new Error('Flight Computer has no target');
        }

        return new Vector3().copy(this.target);
    }

    public setTarget(target: Vector3 | null): void {
        if (target === null) {
            this.target = null;
            return;
        }

        this.target = new Vector3().copy(target);
        const newState = this.state.handleNewTarget();

        if (newState) {
            this.setState(newState);
        }
    }

    public update(delta: number) {
        if (!this.entity) {
            throw new Error('Entity not defined');
        }
        const newState = this.state.update(this.entity, delta);

        if (newState) {
            this.setState(newState);
        }
    }

    protected setState(state: FlightComputerState) {
        this.state.onExit(this.entity);
        this.state = state;

        this.state.onEnter(this.entity);
    }

}

export {FlightComputerComponent};
