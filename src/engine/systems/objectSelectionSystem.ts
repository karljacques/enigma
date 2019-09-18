import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Line, LineBasicMaterial, Raycaster, Scene, Vector2} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';
import {PositionComponent} from '@/engine/components/world/positionComponent';

class ObjectSelectionSystem extends System {
    protected raycaster = new Raycaster();
    protected mouse = new Vector2();

    protected family?: Family;
    protected selectables?: Family;

    constructor(protected camera: Camera, protected scene: Scene, protected circleGeometryFactory: CircleGeometryFactory) {
        super();

        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        window.addEventListener('mousedown', (event: MouseEvent) => this.onMouseClick(event));
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine);

        this.family = new FamilyBuilder(engine).include(RenderComponent).build();
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

    protected onMouseClick(event: MouseEvent) {
        console.log(event.button);
        if (event.button === 0) {
            this.unselectAllSelected();

            if (this.family) {
                this.raycaster.setFromCamera(this.mouse, this.camera);

                // calculate objects intersecting the picking ray
                const intersects = this.raycaster.intersectObjects(this.scene.children);

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
            const geometry = this.circleGeometryFactory.createCircleGeometry(0.75);
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

    protected onMouseMove(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

}

export {ObjectSelectionSystem};
