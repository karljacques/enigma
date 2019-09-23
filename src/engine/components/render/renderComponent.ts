import {Component} from '@nova-engine/ecs';
import {Camera, Mesh} from 'three';

class RenderComponent implements Component {
    public static tag = 'RenderComponent';

    public uniforms: any;

    public mesh!: Mesh;

    public getMesh(): Mesh {
        if (!this.mesh) {
            throw new Error('No mesh defined');
        }

        return this.mesh;
    }

    public update(delta: number, camera: Camera): void {

    }
}

export {RenderComponent};
