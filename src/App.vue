<template>
    <div id="app">
        <router-view/>
        <div id="renderer"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {Renderer} from '@/engine/renderer'
    import {Engine} from '@nova-engine/ecs'
    import {ShipFactory} from '@/engine/factories/shipFactory'
    import {VelocityApplicationSystem} from '@/engine/systems/VelocityApplicationSystem'

    @Component
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
            }

            animate()

            this.engine.addSystem(this.renderer)
            this.engine.addSystem(new VelocityApplicationSystem())

            const ship = ShipFactory.createShip()

            this.engine.addEntity(ship)
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
