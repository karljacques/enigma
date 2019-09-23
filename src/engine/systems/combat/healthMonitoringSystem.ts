import {Engine, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {HealthComponent} from '@/engine/components/ship/healthComponent';

class HealthMonitoringSystem extends System {
    protected family!: Family;

    public onAttach(engine: Engine): void {
        this.family = new FamilyBuilder(engine).include(HealthComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        this.family.entities.forEach((entity) => {
            const healthComponent = entity.getComponent(HealthComponent);

            if (healthComponent.hull < 0) {
                engine.removeEntity(entity);
            }
        });
    }

}

export {HealthMonitoringSystem};
