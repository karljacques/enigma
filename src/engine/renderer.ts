import * as THREE from 'three'
import {Camera, PerspectiveCamera, Scene, WebGLRenderer} from 'three'
import {Engine, FamilyBuilder, System, Family, Entity} from '@nova-engine/ecs'
import {RenderComponent} from '@/engine/components/renderComponent'
import {PositionComponent} from '@/engine/components/positionComponent'
import {Pass} from 'three/examples/jsm/postprocessing/Pass'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {ClearPass} from 'three/examples/jsm/postprocessing/ClearPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

class Renderer extends System {
    protected camera: PerspectiveCamera

    protected scene: Scene
    protected starScene: Scene

    protected renderer: WebGLRenderer

    protected family?: Family

    protected composer: EffectComposer

    constructor(mountElement: Element) {
        super()

        this.scene = new Scene()
        this.starScene = new Scene()

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)

        this.renderer = new WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.autoClear = false

        this.composer = new EffectComposer(this.renderer)

        mountElement.appendChild(this.renderer.domElement)

        const renderRegular = new RenderPass(this.scene, this.camera)
        renderRegular.clear = false

        const renderModel = new RenderPass(this.starScene, this.camera)
        renderModel.clear = false

        const effectBloom = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85)

        effectBloom.threshold = 0
        effectBloom.strength = 2
        effectBloom.radius = 1


        const outputPass = new ShaderPass(CopyShader)
        outputPass.renderToScreen = true

        const clearPass = new ClearPass()

        this.composer.addPass(clearPass)
        this.composer.addPass(renderModel)

        this.composer.addPass(effectBloom)
        this.composer.addPass(renderRegular)
        this.composer.addPass(outputPass)

        this.camera.position.z = 5
    }

    public onAttach(engine: Engine): void {
        super.onAttach(engine)

        this.family = new FamilyBuilder(engine).include(RenderComponent).build()
    }

    public getCamera(): Camera {
        return this.camera
    }

    public getScene(): Scene {
        return this.scene
    }

    public getStarScene(): Scene {
        return this.starScene
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
                renderComponent.update(delta)

            }

            this.composer.render(delta)
        }
    }


}

export {Renderer}
