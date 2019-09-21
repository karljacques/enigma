import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Line, LineBasicMaterial, Scene} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';
import {InputSystem} from '@/engine/systems/InputSystem';

class EntitySelectionSystem extends System implements InputEventListener {
    protected family?: Family;
    protected selectables?: Family;

    constructor(protected scene: Scene,
                protected circleGeometryFactory: CircleGeometryFactory,
                protected inputSystem: InputSystem,
    ) {
        super();
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine);

        this.family      = new FamilyBuilder(engine).include(RenderComponent).build();
        this.selectables = new FamilyBuilder(engine).include(SelectableComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        // Move selection indicators accordingly
        if (this.selectables) {
            this.selectables.entities.forEach((entity: Entity) => {
                const selectionComponent = entity.getComponent(SelectableComponent);
                if (selectionComponent.selectionIndicatorObject) {
                    const positionComponent = entity.getComponent(PositionComponent);
                    selectionComponent.selectionIndicatorObject.position.copy(positionComponent.getPosition());
                }
            });
        }
    }

    public onInputEvent(type: string, event: Event): void {
        if (type === 'click') {
            this.onMouseClick(event as WorldMouseEvent);
        }
    }

    protected onMouseClick(event: WorldMouseEvent) {
        if (event.button === 0) {
            if (!this.inputSystem.isKeyPressed('Shift')) {
                this.unselectAllSelected();
            }

            if (this.family) {
                // calculate objects intersecting the picking ray
                const intersects = event.raycaster.intersectObjects(this.scene.children);

                for (const obj of intersects) {
                    const selectedObject = obj.object;

                    // Find the render component which has this object
                    for (const entity of this.family.entities) {
                        if (entity.hasComponent(SelectableComponent)) {
                            const renderComponent = entity.getComponent(RenderComponent);
                            if (renderComponent.getMesh() === selectedObject) {
                                this.selectEntity(entity);
                            }
                        }

                    }

                }
            }
        }

    }

    protected selectEntity(entity: Entity): void {
        const selectableComponent = entity.getComponent(SelectableComponent);

        selectableComponent.select();

        if (selectableComponent.selectionIndicatorObject === null) {
            const geometry                               = this.circleGeometryFactory.createCircleGeometry(0.75);
            selectableComponent.selectionIndicatorObject = new Line(geometry, new LineBasicMaterial({color: 0x0000FF}));
            this.scene.add(selectableComponent.selectionIndicatorObject);
        }
    }

    protected deselectEntity(entity: Entity): void {
        const selectableComponent = entity.getComponent(SelectableComponent);

        selectableComponent.deselect();

        if (selectableComponent.selectionIndicatorObject !== null) {
            this.scene.remove(selectableComponent.selectionIndicatorObject);
            selectableComponent.selectionIndicatorObject = null;
        }
    }

    protected unselectAllSelected() {
        if (this.selectables) {
            for (const entity of this.selectables.entities) {
                this.deselectEntity(entity);
            }
        }
    }

}

export {EntitySelectionSystem};
