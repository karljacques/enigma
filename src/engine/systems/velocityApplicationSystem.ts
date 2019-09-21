import {Engine, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import {PositionComponent} from '@/engine/components/world/positionComponent';

class VelocityApplicationSystem extends System {

    protected family?: Family;

    public onAttach(engine: Engine): void {
        super.onAttach(engine);

        this.family = new FamilyBuilder(engine).include(VelocityComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        if (this.family) {
            for (const entity of this.family.entities) {
                const velocityComponent = entity.getComponent(VelocityComponent);
                const positionComponent = entity.getComponent(PositionComponent);

                const newVelocity = velocityComponent.getVelocity()
                    .add(velocityComponent.getAcceleration().multiplyScalar(delta));

                velocityComponent.setVelocity(newVelocity);

                const movement    = velocityComponent.getVelocity().multiplyScalar(delta);
                const newPosition = positionComponent.getPosition().add(movement);

                positionComponent.setPosition(newPosition);
            }
        }
    }
}

export {VelocityApplicationSystem};
