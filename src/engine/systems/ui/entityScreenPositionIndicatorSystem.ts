import {Engine, Entity, Family, FamilyBuilder, System} from "@nova-engine/ecs";
import {PositionComponent} from "@/engine/components/world/positionComponent";
import {Camera, Vector2} from "three";
import {EntityLocationIndicatorComponent} from "@/engine/components/render/entityLocationIndicatorComponent";
import {EventBus} from "@/eventBus";
import {RenderComponent} from "@/engine/components/render/renderComponent";
import {Ship} from "@/engine/entities/ship";

class EntityScreenPositionIndicatorSystem extends System {
    positionedEntitiesFamily!: Family;

    constructor(protected camera: Camera) {
        super();
    }

    public onAttach(engine: Engine): void {
        this.positionedEntitiesFamily = new FamilyBuilder(engine).include(PositionComponent).build();
    }

    update(engine: Engine, delta: number): void {
        this.positionedEntitiesFamily.entities.forEach((entity: Entity) => {
            if (entity instanceof Ship) {
                // Is the entity on screen?
                const vector = entity.getComponent(PositionComponent).getPosition();

                entity.getComponent(RenderComponent).getMesh().updateMatrixWorld();
                vector.setFromMatrixPosition(entity.getComponent(RenderComponent).getMesh().matrixWorld);
                vector.project(this.camera);

                // const onScreen = (vector.x < 1.0 && vector.x > -1.0 && vector.y < 1.0 && vector.y > -1.0);
                const onScreen = true;
                let hasIndicator = entity.hasComponent(EntityLocationIndicatorComponent);

                if (hasIndicator) {
                    if (!onScreen) {
                        EventBus.$emit('before-entity-location-indicator-removed', entity);

                        entity.removeComponent(EntityLocationIndicatorComponent);

                    } else {
                        let indicator = entity.getComponent(EntityLocationIndicatorComponent);
                        indicator.screenPosition.set(vector.x, vector.y);
                    }
                } else {
                    if (onScreen) {
                        const component = entity.putComponent(EntityLocationIndicatorComponent);
                        component.screenPosition = new Vector2(vector.x, vector.y);
                        component.name = entity.name;

                        EventBus.$emit('entity-location-indicator-added', entity);
                    }
                }
            }
        });
    }

}

export {EntityScreenPositionIndicatorSystem};