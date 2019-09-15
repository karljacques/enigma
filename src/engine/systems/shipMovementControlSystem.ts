import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Plane, Raycaster, Scene, Vector2, Vector3} from 'three';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';

class ShipMovementControlSystem extends System {
    protected plane = new Plane(new Vector3(0.0, 1.0, 0.0), 0);
    protected mouse = new Vector2();
    protected raycaster = new Raycaster();
    protected target = new Vector3();

    protected selectables?: Family;

    constructor(protected camera: Camera, protected scene: Scene) {
        super();

        window.addEventListener('contextmenu', (event: MouseEvent) => this.onRightClick(event));
        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

    }

    public onAttach(engine: Engine): void {
        this.selectables = new FamilyBuilder(engine).include(SelectableComponent).build();
    }

    update(engine: Engine, delta: number): void {
    }

    protected onRightClick(event: MouseEvent) {
        event.preventDefault();

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.raycaster.ray.intersectPlane(this.plane, this.target);

        if (this.selectables) {
            this.selectables.entities.forEach((entity: Entity) => {
                const selectable = entity.getComponent(SelectableComponent);
                console.log(entity);
                console.log(selectable);
                if (selectable.isSelected()) {
                    const positionComponent = entity.getComponent(PositionComponent);
                    const velocityComponent = entity.getComponent(VelocityComponent);

                    const direction = this.target.sub(positionComponent.position);
                    velocityComponent.setVelocity(direction.normalize().multiplyScalar(0.01));
                }
            });
        }
    }

    protected onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    }

}

export {ShipMovementControlSystem};
