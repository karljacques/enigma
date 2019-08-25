import {Engine, Family, FamilyBuilder, System} from '@nova-engine/ecs'
import {VelocityComponent} from '@/engine/components/velocityComponent'
import {PositionComponent} from '@/engine/components/positionComponent'

class VelocityApplicationSystem extends System {

    protected family?: Family

    public onAttach(engine: Engine): void {
        super.onAttach(engine)

        this.family = new FamilyBuilder(engine).include(VelocityComponent).build()
    }

    public update(engine: Engine, delta: number): void {
        if (this.family) {
            for (const entity of this.family.entities) {
                const velocityComponent = entity.getComponent(VelocityComponent)
                const positionComponent = entity.getComponent(PositionComponent)

                positionComponent.x += velocityComponent.x
                positionComponent.y += velocityComponent.y
                positionComponent.z += velocityComponent.z

                console.log('updating pos')
            }
        }
    }
}

export {VelocityApplicationSystem}
