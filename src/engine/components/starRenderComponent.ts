import {RenderComponent} from '@/engine/components/renderComponent'

class StarRenderComponent extends RenderComponent {

    public update(delta: number): void {
        this.uniforms.time.value += 0.2 * 0.05
    }
}

export {StarRenderComponent}
