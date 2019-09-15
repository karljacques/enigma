import {Engine, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Raycaster, Scene, Vector2} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';

class ObjectSelectionSystem extends System {
    protected raycaster = new Raycaster();
    protected mouse = new Vector2();

    protected family?: Family;
    protected selectables?: Family;

    constructor(protected camera: Camera, protected scene: Scene) {
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
                                entity.getComponent(SelectableComponent).select();
                            }
                        }

                    }

                }
            }
        }

    }

    protected unselectAllSelected() {
        if (this.selectables) {
            for (const entity of this.selectables.entities) {
                const component = entity.getComponent(SelectableComponent);
                component.deselect();
            }
        }
    }

    protected onMouseMove(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

}

export {ObjectSelectionSystem};
