import {Geometry, Vector3} from 'three';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry';

class CircleGeometryFactory {
    public createCircleGeometry(radius: number, segments: number = 64): LineGeometry {

        const geometry = new LineGeometry();
        const vertices = [];
        const colours  = [];

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            vertices.push(
                Math.cos(theta) * radius,
                0,
                Math.sin(theta) * radius);
            colours.push(0.5, 0.5, 0.5);
        }

        geometry.setPositions(vertices);
        geometry.setColors(colours);
        return geometry;
    }
}

export {CircleGeometryFactory};
