import {RenderComponent} from '@/engine/components/render/renderComponent';

class StarRenderComponent extends RenderComponent {

    public update(delta: number): void {
        this.uniforms.time.value += 1.0 * delta
    }
}

export {StarRenderComponent}
