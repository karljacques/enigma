import {Camera} from 'three';
import {RenderComponent} from '@/engine/components/render/renderComponent';

class SelectionMarkerRenderComponent extends RenderComponent {
    public update(delta: number, camera: Camera): void {
        super.update(delta, camera);

        this.mesh.rotateY(delta);

        const distance = camera.position.distanceTo(this.mesh.position);

        if (distance < 10) {
            this.mesh.material.linewidth = 5;
        } else if (distance < 25) {
            this.mesh.material.linewidth = 3;
        } else if (distance < 50) {
            this.mesh.material.linewidth = 2;
        } else {
            this.mesh.material.linewidth = 1;
        }
    }
}

export {SelectionMarkerRenderComponent};
