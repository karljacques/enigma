import {Engine, EngineEntityListener, Entity} from '@nova-engine/ecs';
import {LineMaterialFactory} from '@/engine/factories/material/lineMaterialFactory';
import {Line2} from 'three/examples/jsm/lines/Line2';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {BloomRenderComponent} from '@/engine/components/render/bloomRenderComponent';
import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';

class SelectionMarkerTracker implements EngineEntityListener {
    protected selectionMarkerMap: Map<Entity, Entity> = new Map();

    constructor(protected engine: Engine) {

    }

    public onEntityAdded(entity: Entity): void {
    }

    public onEntityRemoved(entity: Entity): void {
        this.onEntityDeselection(entity);
    }

    public onEntitySelection(entity: Entity): void {
        if (!this.selectionMarkerMap.has(entity)) {
            const geometry = CircleGeometryFactory.createCircleGeometry(0.75);
            const material = LineMaterialFactory.buildDottedMaterial(0x0011ee, 10);

            const line = new Line2(geometry, material);
            line.computeLineDistances();
            line.scale.set(1, 1, 1);

            const selectionMarker = new Entity();

            selectionMarker.putComponent(PositionComponent)
                .setPositionReference(entity.getComponent(PositionComponent).getPositionReference());
            selectionMarker.putComponent(BloomRenderComponent).mesh = line;

            this.engine.addEntity(selectionMarker);
            this.selectionMarkerMap.set(entity, selectionMarker);
        }
    }

    public onEntityDeselection(entity: Entity): void {
        const markerEntity = this.selectionMarkerMap.get(entity);

        if (markerEntity) {
            this.engine.removeEntity(markerEntity);
            this.selectionMarkerMap.delete(entity);
        }
    }
}

export {SelectionMarkerTracker};
