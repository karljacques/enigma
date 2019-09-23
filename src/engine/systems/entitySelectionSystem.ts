import {Engine, EngineEntityListener, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Scene, WebGLRenderer} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';
import {UserInputSystem} from '@/engine/systems/userInputSystem';
import {SelectionBox} from 'three/examples/jsm/interactive/SelectionBox';
import {SelectionHelper} from '@/engine/systems/input/selectionHelper';
import {SelectionMarkerTracker} from '@/engine/class/marker/selectionMarkerTracker';

class EntitySelectionSystem extends System implements InputEventListener, EngineEntityListener {
    protected family!: Family;
    protected selectables!: Family;

    protected selectionBox!: SelectionBox;
    protected selectionHelper!: SelectionHelper;

    protected selectionMarkerTracker!: SelectionMarkerTracker;

    constructor(protected scene: Scene,
                protected camera: Camera,
                protected renderer: WebGLRenderer,
                protected inputSystem: UserInputSystem,
    ) {
        super();
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine);

        this.family      = new FamilyBuilder(engine).include(RenderComponent).build();
        this.selectables = new FamilyBuilder(engine).include(SelectableComponent).build();

        this.selectionBox    = new SelectionBox(this.camera, this.scene);
        this.selectionHelper = new SelectionHelper(this.selectionBox, this.renderer, 'selectBox');

        this.selectionMarkerTracker = new SelectionMarkerTracker(engine);
        engine.addEntityListener(this.selectionMarkerTracker);
    }

    public update(engine: Engine, delta: number): void {
    }

    public onInputEvent(type: string, event: Event): void {

        if (type === 'mousedown') {
            this.onMouseClick(event as WorldMouseEvent);
            this.startSelection(event as WorldMouseEvent);
        }

        if (type === 'mousemove') {
            this.onMouseMove(event as MouseEvent);
        }
    }

    public onEntityAdded(entity: Entity): void {
    }

    public onEntityRemoved(entity: Entity): void {
        if (entity.hasComponent(SelectableComponent)) {
            this.deselectEntity(entity);
        }
    }

    protected startSelection(event: WorldMouseEvent): void {
        this.selectionBox.startPoint.set(event.position.x, event.position.y, 0.5);
    }

    protected onMouseMove(event: MouseEvent): void {
        if (this.inputSystem.isMousePressed(0)) {
            this.selectionBox.endPoint.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                0.5);

            const allSelected = this.selectionBox.select(this.selectionBox.startPoint, this.selectionBox.endPoint);

            for (const obj of allSelected) {
                // Find the render component which has this object
                for (const entity of this.family.entities) {
                    if (entity.hasComponent(SelectableComponent)) {
                        const renderComponent = entity.getComponent(RenderComponent);
                        if (renderComponent.getMesh() === obj) {
                            this.selectEntity(entity);
                        }
                    }

                }

            }
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

        if (!selectableComponent.isSelected()) {
            this.selectionMarkerTracker.onEntitySelection(entity);
        }

        selectableComponent.select();
    }

    protected deselectEntity(entity: Entity): void {
        const selectableComponent = entity.getComponent(SelectableComponent);

        selectableComponent.deselect();

        this.selectionMarkerTracker.onEntityDeselection(entity);
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
