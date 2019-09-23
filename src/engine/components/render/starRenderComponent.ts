import {BloomRenderComponent} from '@/engine/components/render/bloomRenderComponent';

class StarRenderComponent extends BloomRenderComponent {
    public update(delta: number): void {
        this.uniforms.time.value += delta;
    }
}

export {StarRenderComponent};
