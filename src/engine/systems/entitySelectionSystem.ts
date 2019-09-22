import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {Camera, Renderer, Scene, WebGLRenderer} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';
import {UserInputSystem} from '@/engine/systems/userInputSystem';
import {Line2} from 'three/examples/jsm/lines/Line2';
import {LineMaterialFactory} from '@/engine/factories/material/lineMaterialFactory';
import {SelectionBox} from 'three/examples/jsm/interactive/SelectionBox';
import {SelectionHelper} from '@/engine/systems/input/selectionHelper';

class EntitySelectionSystem extends System implements InputEventListener {
    protected family!: Family;
    protected selectables!: Family;

    protected selectionBox!: SelectionBox;
    protected selectionHelper!: SelectionHelper;

    constructor(protected scene: Scene,
                protected camera: Camera,
                protected renderer: WebGLRenderer,
                protected circleGeometryFactory: CircleGeometryFactory,
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

        if (type === 'mousedown') {
            this.onMouseClick(event as WorldMouseEvent);
            this.startSelection(event as WorldMouseEvent);
        }

        if (type === 'mousemove') {
            this.onMouseMove(event as MouseEvent);
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

        selectableComponent.select();

        if (selectableComponent.selectionIndicatorObject === null) {
            const geometry = this.circleGeometryFactory.createCircleGeometry(0.75);

            const material = LineMaterialFactory.buildDottedMaterial(0x0011ee, 10);

            const line = new Line2(geometry, material);
            line.computeLineDistances();
            line.scale.set(1, 1, 1);

            selectableComponent.selectionIndicatorObject = line;

            const position = entity.getComponent(PositionComponent).getPosition();
            line.position.copy(position);

            this.scene.add(line);
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
