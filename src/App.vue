<template>
    <div id="app">
        <v-app theme="dark">
            <router-view/>
            <shader-loader></shader-loader>
            <div id="renderer"></div>
        </v-app>

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
    import {Clock, Vector3} from 'three';
    import {CircleGeometryFactory} from '@/engine/factories/geometry/circleGeometryFactory';
    import {CameraControlSystem} from '@/engine/systems/cameraControlSystem';
    import {EntitySelectionSystem} from '@/engine/systems/entitySelectionSystem';
    import {ShipMovementControlSystem} from '@/engine/systems/shipMovementControlSystem';
    import {FlightComputerProcessorSystem} from '@/engine/systems/flightComputerProcessorSystem';
    import {engine, resetEngine} from '@/engine';
    import {UserInputSystem} from '@/engine/systems/userInputSystem';
    import {LineMaterialFactory} from '@/engine/factories/material/lineMaterialFactory';
    import {Line2} from 'three/examples/jsm/lines/Line2';
    import {solOrbitDistances, sunRadius} from '@/engine/scalingHelper';

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

            (new StarFactory(this.renderer, this.engine)).createStar(sunRadius);

            const circleFactory = new CircleGeometryFactory();

            Object.values(solOrbitDistances).forEach((radius: number) => {
                const geo      = circleFactory.createCircleGeometry(radius, 100);
                const material = LineMaterialFactory.buildDottedMaterial(0xFFFFFF, 5);
                this.renderer.getScene().add(new Line2(geo, material));
            });

            const inputSystem = new UserInputSystem(this.renderer.getCamera());
            this.engine.addSystem(inputSystem);

            const entitySelectionSystem = new EntitySelectionSystem(this.renderer.getScene(), circleFactory, inputSystem);
            this.engine.addSystem(entitySelectionSystem);
            inputSystem.addEventListener(entitySelectionSystem);

            const shipMovementControlSystem = new ShipMovementControlSystem(this.renderer.getScene());
            this.engine.addSystem(shipMovementControlSystem);
            inputSystem.addEventListener(shipMovementControlSystem);

            this.engine.addSystem(new FlightComputerProcessorSystem());

            const cameraControl = new CameraControlSystem(this.renderer.getCamera(), inputSystem);
            inputSystem.addEventListener(cameraControl);

            this.engine.addSystem(cameraControl);

            const clock   = new Clock;
            const animate = () => {

                this.engine.update(clock.getDelta());
                requestAnimationFrame(animate);
            };
            animate();
        }

        public beforeDestroy() {
            console.log('destroy');
            resetEngine();
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

    .theme--dark {
        &.v-application {
            background: transparent !important;

            .v-sheet {
                background-color: rgba(76, 76, 76, 0.8) !important;
            }
        }
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
