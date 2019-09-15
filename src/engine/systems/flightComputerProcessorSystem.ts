import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import {Vector3} from 'three';

class FlightComputerProcessorSystem extends System {

    protected flightComputers?: Family;

    protected static getThrustVector(
        position: PositionComponent,
        velocityComponent: VelocityComponent,
        target: Vector3,
        maxThrust: number = 1
    ): Vector3 {
        const cancelCurrentVector = velocityComponent.getVelocity().multiplyScalar(-1);

        const newVector = target.sub(position.position);

        return cancelCurrentVector.add(newVector).normalize().multiplyScalar(maxThrust);
    }

    public onAttach(engine: Engine): void {
        this.flightComputers = new FamilyBuilder(engine).include(FlightComputerComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        if (this.flightComputers) {
            this.flightComputers.entities.forEach((entity: Entity) => {
                const flightComputer = entity.getComponent(FlightComputerComponent);

                if (flightComputer.hasTarget()) {
                    const positionComponent = entity.getComponent(PositionComponent);
                    const velocityComponent = entity.getComponent(VelocityComponent);

                    const vector = FlightComputerProcessorSystem.getThrustVector(positionComponent, velocityComponent, flightComputer.getTarget());
                    velocityComponent.setAcceleration(vector.normalize());

                }
            });
        }
    }
}

export {FlightComputerProcessorSystem};
