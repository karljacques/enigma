import {Star} from '@/engine/entities/star'
import {PositionComponent} from '@/engine/components/positionComponent'
import {Mesh, RepeatWrapping, ShaderMaterial, SphereGeometry, TextureLoader, Vector2, Vector3} from 'three'
import {StarRenderComponent} from '@/engine/components/starRenderComponent'

class StarFactory {
    public static createStar(size: number): Star {
        const vertexElement = document.getElementById('vertexShader')
        if (!vertexElement) {
            throw new Error('Could not locate vertexShader')
        }

        const vertexShader: string = vertexElement.textContent || ''

        const fragmentElement = document.getElementById('fragmentShader')
        if (!fragmentElement) {
            throw new Error('Could not locate fragmentShader')
        }

        const fragmentShader: string = fragmentElement.textContent || ''

        const textureLoader = new TextureLoader()


        const entity = new Star()
        entity.putComponent(PositionComponent)
        entity.putComponent(StarRenderComponent)

        const renderComponent = entity.getComponent(StarRenderComponent)

        // Render a star
        renderComponent.uniforms = {
            fogDensity: {value: 0.45},
            fogColor: {value: new Vector3(0, 0, 0)},
            time: {value: 1.0},
            uvScale: {value: new Vector2(3.0, 1.0)},
            texture1: {value: textureLoader.load('textures/lava/cloud.png')},
            texture2: {value: textureLoader.load('textures/lava/lavatile.jpg')},
        }

        renderComponent.uniforms.texture1.value.wrapS = renderComponent.uniforms.texture1.value.wrapT = RepeatWrapping
        renderComponent.uniforms.texture2.value.wrapS = renderComponent.uniforms.texture2.value.wrapT = RepeatWrapping

        const material = new ShaderMaterial({
            uniforms: renderComponent.uniforms,

            vertexShader,
            fragmentShader,
        })

        renderComponent.mesh = new Mesh(new SphereGeometry(size, 30, 30, 1), material)
        // renderComponent.mesh.rotation.x = 0.3
        return entity
    }
}

export {StarFactory}