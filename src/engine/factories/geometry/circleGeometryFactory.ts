import {Geometry, Vector3} from 'three';

class CircleGeometryFactory {
    public createCircleGeometry(radius: number, segments: number = 32): Geometry {

        const geometry = new Geometry();

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            geometry.vertices.push(
                new Vector3(
                    Math.cos(theta) * radius,
                    0,
                    Math.sin(theta) * radius));
        }

        return geometry;
    }
}

export {CircleGeometryFactory};
