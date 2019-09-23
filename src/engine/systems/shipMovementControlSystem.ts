import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Mesh, MeshBasicMaterial, SphereGeometry, Vector3} from 'three';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';
import {PositionComponent} from '@/engine/components/world/positionComponent';

class ShipMovementControlSystem extends System implements InputEventListener {
    protected selectables!: Family;

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
        let lead: Entity | null = null;

        this.selectables.entities.forEach((entity: Entity) => {
            const selectable = entity.getComponent(SelectableComponent);

            if (selectable.isSelected()) {
                if (entity.hasComponent(FlightComputerComponent)) {

                    const target = new Vector3().copy(event.intersect);

                    if (!lead) {
                        lead = entity;
                    } else {
                        // Add vector between this entity and lead to target to maintain formation
                        const position     = entity.getComponent(PositionComponent).getPosition();
                        const leadPosition = lead.getComponent(PositionComponent).getPosition();

                        const offset = position.sub(leadPosition);
                        target.add(offset);
                    }

                    const flightComputer = entity.getComponent(FlightComputerComponent);
                    flightComputer.setTarget(target);

                    const geometry = new SphereGeometry(0.1);
                    const material = new MeshBasicMaterial({color: 0xff0000});
                    const mesh     = new Mesh(geometry, material);

                    mesh.position.copy(event.intersect);
                }
            }
        });
    }


}

export {ShipMovementControlSystem};
