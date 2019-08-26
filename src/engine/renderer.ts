import * as THREE from 'three'
import {Camera, Scene} from 'three'
import {Engine, FamilyBuilder, System, Family, Entity} from '@nova-engine/ecs'
import {RenderComponent} from '@/engine/components/renderComponent'
import {PositionComponent} from '@/engine/components/positionComponent'

class Renderer extends System {
    protected camera: THREE.PerspectiveCamera
    protected scene: THREE.Scene
    protected renderer: THREE.WebGLRenderer

    protected family?: Family

    constructor(mountElement: Element) {
        super()

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.autoClear = false
        mountElement.appendChild(this.renderer.domElement)


        this.camera.position.z = 5
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine)

        this.family = new FamilyBuilder(engine).include(RenderComponent).build()

        const orig = this.family.onEntityAdded.bind(this.family)

        this.family.onEntityAdded = (entity: Entity) => {
            orig(entity)
            const renderComponent = entity.getComponent(RenderComponent)
            this.scene.add(renderComponent.getMesh())
        }
    }

    public getCamera(): Camera {
        return this.camera
    }

    public getScene(): Scene {
        return this.scene
    }

    public getRenderer(): THREE.WebGLRenderer {
        return this.renderer
    }

    public update(engine: Engine, delta: number): void {

        if (this.family) {
            for (const entity of this.family.entities) {
                const positionComponent = entity.getComponent(PositionComponent)
                const renderComponent = entity.getComponent(RenderComponent)

                renderComponent.getMesh().position.copy(positionComponent.position)

            }
            this.renderer.clear()
            // this.renderer.render(this.scene, this.camera)
        }
    }


}

export {Renderer}
