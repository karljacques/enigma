import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Mesh, MeshBasicMaterial, Scene, SphereGeometry} from 'three';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';

class ShipMovementControlSystem extends System implements InputEventListener {
    protected selectables?: Family;

    constructor(protected scene: Scene) {
        super();
    }

    public onAttach(engine: Engine): void {
        this.selectables = new FamilyBuilder(engine).include(SelectableComponent).build();
    }

    public update(engine: Engine, delta: number): void {
    }

    public onInputEvent(type: string, event: Event): void {
        if (type === 'rightclick') {
            this.onRightClick(event as WorldMouseEvent);
        }
    }

    protected onRightClick(event: WorldMouseEvent) {
        if (this.selectables) {
            this.selectables.entities.forEach((entity: Entity) => {
                const selectable = entity.getComponent(SelectableComponent);

                if (selectable.isSelected()) {
                    if (entity.hasComponent(FlightComputerComponent)) {
                        const flightComputer = entity.getComponent(FlightComputerComponent);
                        flightComputer.setTarget(event.intersect);


                        const geometry = new SphereGeometry(0.1);
                        const material = new MeshBasicMaterial({color: 0xff0000});
                        const mesh     = new Mesh(geometry, material);

                        mesh.position.copy(event.intersect);
                        this.scene.add(mesh);
                    }
                }
            });
        }
    }


}

export {ShipMovementControlSystem};
