import {BloomRenderComponent} from '@/engine/components/render/bloomRenderComponent';

class SelectionMarkerRenderComponent extends BloomRenderComponent {
    public update(delta: number): void {
        super.update(delta);

        this.mesh.rotateY(delta);
    }
}

export {SelectionMarkerRenderComponent};
