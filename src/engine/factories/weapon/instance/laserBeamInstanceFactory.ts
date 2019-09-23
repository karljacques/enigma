import {Vector3} from 'three';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry';
import {LineMaterialFactory} from '@/engine/factories/material/lineMaterialFactory';
import {Line2} from 'three/examples/jsm/lines/Line2';
import {LaserBeam} from '@/engine/entities/weapon/laserBeam';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {BloomRenderComponent} from '@/engine/components/render/bloomRenderComponent';

class LaserBeamInstanceFactory {

    public static create(source: Vector3, destination: Vector3, colour: number): LaserBeam {
        const geometry = new LineGeometry();

        geometry.setPositions([source.x, source.y, source.z, destination.x, destination.y, destination.z]);

        const material = LineMaterialFactory.buildSolidMaterial(colour, 5);
        const line     = new Line2(geometry, material);

        const entity = new LaserBeam();

        entity.putComponent(PositionComponent);
        entity.putComponent(BloomRenderComponent).mesh = line;

        return entity;
    }
}

export {LaserBeamInstanceFactory};
