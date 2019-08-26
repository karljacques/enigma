<template>
    <div id="app">
        <router-view/>
        <shader-loader></shader-loader>
        <div id="renderer"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {Renderer} from '@/engine/renderer'
    import {Engine} from '@nova-engine/ecs'
    import {ShipFactory} from '@/engine/factories/shipFactory'
    import {VelocityApplicationSystem} from '@/engine/systems/VelocityApplicationSystem'
    import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
    import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
    import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js'
    import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
    import * as THREE from 'three'
    import {Star} from '@/engine/entities/star'
    import {PositionComponent} from '@/engine/components/positionComponent'
    import {RenderComponent} from '@/engine/components/renderComponent'
    import ShaderLoader from '@/components/shaders/ShaderLoader.vue'
    import {Vector3} from 'three'

    @Component({
        components: {ShaderLoader}
    })
    export default class App extends Vue {
        renderer?: Renderer
        engine?: Engine

        public mounted() {
            const element = document.getElementById('renderer')

            if (!element) {
                throw new Error('Could not find render element')
            }

            this.engine = new Engine()
            this.renderer = new Renderer(element)

            const animate = () => {
                requestAnimationFrame(animate)

                this.engine.update(16)
                if (composer) {
                    composer.render(0.5)
                }
                uniforms['time'].value += 0.2 * 0.2
            }


            this.engine.addSystem(this.renderer)
            this.engine.addSystem(new VelocityApplicationSystem())

            // const ship = ShipFactory.createShip()
            // ship.getComponent(PositionComponent).position = new Vector3(1, 1, 1)
            // this.engine.addEntity(ship)


            var textureLoader = new THREE.TextureLoader()

            // Render a star
            const uniforms = {
                'fogDensity': {value: 0.45},
                'fogColor': {value: new THREE.Vector3(0, 0, 0)},
                'time': {value: 1.0},
                'uvScale': {value: new THREE.Vector2(3.0, 1.0)},
                'texture1': {value: textureLoader.load('textures/lava/cloud.png')},
                'texture2': {value: textureLoader.load('textures/lava/lavatile.jpg')}
            }
            uniforms['texture1'].value.wrapS = uniforms['texture1'].value.wrapT = THREE.RepeatWrapping
            uniforms['texture2'].value.wrapS = uniforms['texture2'].value.wrapT = THREE.RepeatWrapping

            const size = 2

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

            const material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader,
                fragmentShader
            })

            const entity = new Star()
            entity.putComponent(PositionComponent)
            entity.putComponent(RenderComponent)

            const renderComponent = entity.getComponent(RenderComponent)

            renderComponent.mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 30, 30, 1), material)
            // renderComponent.mesh.rotation.x = 0.3

            this.engine.addEntity(entity)

            const renderModel = new RenderPass(this.renderer.getScene(), this.renderer.getCamera())
            const effectBloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)

            effectBloom.threshold = 0
            effectBloom.strength = 2
            effectBloom.radius = 1
            const effectFilm = new FilmPass(0.35, 0.95, 2048, 0)
            const composer = new EffectComposer(this.renderer.getRenderer())
            composer.addPass(renderModel)
            composer.addPass(effectBloom)
            composer.addPass(effectFilm)

            animate()

        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body {
        margin: 0;
    }

    canvas {
        width: 100%;
        height: 100%
    }

    #renderer {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
