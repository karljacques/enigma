import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';

class FlightComputerProcessorSystem extends System {

    protected flightComputerFamily?: Family;

    public onAttach(engine: Engine): void {
        this.flightComputerFamily = new FamilyBuilder(engine).include(FlightComputerComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        if (this.flightComputerFamily) {
            this.flightComputerFamily.entities.forEach((entity: Entity) => {
                entity.getComponent(FlightComputerComponent).update(delta);
            });
        }
    }
}

export {FlightComputerProcessorSystem};
