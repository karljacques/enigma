<template>
    <div id="app">
        <router-view/>
        <shader-loader></shader-loader>
        <div id="renderer"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Renderer} from '@/engine/renderer'
    import {Engine} from '@nova-engine/ecs'
    import {ShipFactory} from '@/engine/factories/shipFactory'
    import {VelocityApplicationSystem} from '@/engine/systems/VelocityApplicationSystem'
    import {PositionComponent} from '@/engine/components/positionComponent'
    import ShaderLoader from '@/components/shaders/ShaderLoader.vue'
    import {StarFactory} from '@/engine/factories/starFactory'
    import {Vector3} from 'three'
    import {RenderComponent} from '@/engine/components/renderComponent'
    import {VelocityComponent} from '@/engine/components/velocityComponent'

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

                // uniforms['time'].value += 0.2 * 0.05
            }


            this.engine.addSystem(this.renderer)
            this.engine.addSystem(new VelocityApplicationSystem())
            const ship = ShipFactory.createShip()
            ship.getComponent(PositionComponent).position = new Vector3(1, 1, 1)
            ship.getComponent(VelocityComponent).velocity = new Vector3(0.01, 0.01, 0.01)
            this.engine.addEntity(ship)

            this.renderer.getScene().add(ship.getComponent(RenderComponent).getMesh())
            const star = StarFactory.createStar(2)
            this.engine.addEntity(star)

            this.renderer.getStarScene().add(star.getComponent(RenderComponent).getMesh())

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
