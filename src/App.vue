<template>
    <div id="app">
        <router-view/>
        <shader-loader></shader-loader>
        <div id="renderer"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Renderer} from '@/engine/renderer';
    import {Engine} from '@nova-engine/ecs';
    import {ShipFactory} from '@/engine/factories/shipFactory';
    import {VelocityApplicationSystem} from '@/engine/systems/velocityApplicationSystem';
    import {PositionComponent} from '@/engine/components/world/positionComponent';
    import ShaderLoader from '@/components/shaders/ShaderLoader.vue';
    import {StarFactory} from '@/engine/factories/starFactory';
    import {Clock, Line, LineBasicMaterial, Vector3} from 'three';
    import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';
    import {CameraControlSystem} from '@/engine/systems/cameraControlSystem';
    import {EntitySelectionSystem} from '@/engine/systems/entitySelectionSystem';
    import {ShipMovementControlSystem} from '@/engine/systems/shipMovementControlSystem';
    import {FlightComputerProcessorSystem} from '@/engine/systems/flightComputerProcessorSystem';
    import {engine} from '@/engine';
    import {InputSystem} from '@/engine/systems/InputSystem';

    @Component({
                   components: {ShaderLoader}
               })
    export default class App extends Vue {
        renderer?: Renderer;
        engine?: Engine;

        public mounted() {
            const element = document.getElementById('renderer');

            if (!element) {
                throw new Error('Could not find render element');
            }

            this.engine   = engine;
            this.renderer = new Renderer(element);

            this.engine.addSystem(this.renderer);
            this.engine.addSystem(new VelocityApplicationSystem());

            const shipFactory = new ShipFactory(this.renderer, this.engine);

            for (let i = 0; i < 5; i++) {
                const ship = shipFactory.createShip();
                ship.getComponent(PositionComponent).setPosition(new Vector3(i, 0, 10));
            }

            (new StarFactory(this.renderer, this.engine)).createStar(2);

            const circleFactory = new CircleGeometryFactory()

            ;[25, 50, 75, 125].forEach((radius: number) => {
                const geo = circleFactory.createCircleGeometry(radius, 100);
                this.renderer.getScene().add(new Line(geo, new LineBasicMaterial({color: 0xFFFFFF})));
            });

            const inputSystem = new InputSystem(this.renderer.getCamera());
            this.engine.addSystem(inputSystem);

            const entitySelectionSystem = new EntitySelectionSystem(this.renderer.getScene(), circleFactory, inputSystem);
            this.engine.addSystem(entitySelectionSystem);
            inputSystem.addEventListener(entitySelectionSystem);

            const shipMovementControlSystem = new ShipMovementControlSystem(this.renderer.getScene());
            this.engine.addSystem(shipMovementControlSystem);
            inputSystem.addEventListener(shipMovementControlSystem);

            this.engine.addSystem(new FlightComputerProcessorSystem());

            const cameraControl = new CameraControlSystem(this.renderer.getCamera());
            this.engine.addSystem(cameraControl);

            const clock   = new Clock;
            const animate = () => {

                this.engine.update(clock.getDelta());
                requestAnimationFrame(animate);
            };
            animate();
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
