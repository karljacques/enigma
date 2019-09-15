import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Raycaster, Scene, Vector2} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';

class ObjectSelectionSystem extends System {
    protected raycaster = new Raycaster();
    protected mouse = new Vector2();

    protected selected: Record<string, Entity> = {};
    protected family?: Family;

    constructor(protected camera: Camera, protected scene: Scene) {
        super();

        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        window.addEventListener('mousedown', (event: MouseEvent) => this.onMouseClick(event));
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine);

        this.family = new FamilyBuilder(engine).include(RenderComponent).build();
    }

    public update(engine: Engine, delta: number): void {

    }

    protected onMouseClick(event: MouseEvent) {
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
                            this.selected[entity.id] = entity;

                            entity.getComponent(SelectableComponent).onSelection();
                        }
                    }

                }

            }
        }

        console.log(this.selected);
    }

    protected unselectAllSelected() {
        Object.values(this.selected).forEach((entity: Entity) => {
            entity.getComponent(SelectableComponent).onDeselection();
        });

        this.selected = {};
    }

    protected onMouseMove(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

}

export {ObjectSelectionSystem};
