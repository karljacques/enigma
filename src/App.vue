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
    import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
    import {AutomatedFiringSystem} from '@/engine/systems/automatedFiringSystem';
    import {LaserHandlingSystem} from '@/engine/systems/combat/weapons/laserHandlingSystem';
    import {HealthMonitoringSystem} from '@/engine/systems/combat/healthMonitoringSystem';

    @Component({
                   components: {ShaderLoader}
               })
    export default class App extends Vue {
        renderer!: Renderer;
        engine!: Engine;

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

            for (let i = 0; i < 10; i++) {
                for (let y = 0; y < 10; y++) {
                    const ship = shipFactory.createShip();
                    ship.getComponent(PositionComponent).setPosition(new Vector3(15 + (i * 2), (Math.random() * 10) - 5, y * 2));
                }
            }

            for (let i = 0; i < 50; i++) {
                const ship = shipFactory.createShip(2);
                ship.getComponent(PositionComponent).setPosition(new Vector3(-20 + i + Math.random() * 20, (Math.random() * 10.0) - 5, 10 + Math.random() * 20.0));

                // ship.getComponent(FlightComputerComponent).setTarget(new Vector3(10000, 0, 10000));

            }

            for (let i = 0; i < 50; i++) {
                const ship = shipFactory.createShip(3, 50000);
                ship.getComponent(PositionComponent).setPosition(new Vector3(100 + i + Math.random() * 20, (Math.random() * 10.0) - 5, 100 + Math.random() * 20.0));

                ship.getComponent(FlightComputerComponent).setTarget(new Vector3(10000, 0, 10000));
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

            console.log(this.renderer.getRenderer().domElement);
            const entitySelectionSystem = new EntitySelectionSystem(this.renderer.getScene(),
                                                                    this.renderer.getCamera(),
                                                                    this.renderer.getRenderer(),
                                                                    circleFactory,
                                                                    inputSystem);
            this.engine.addSystem(entitySelectionSystem);
            inputSystem.addEventListener(entitySelectionSystem);

            this.engine.addSystem(new AutomatedFiringSystem());

            const shipMovementControlSystem = new ShipMovementControlSystem();
            this.engine.addSystem(shipMovementControlSystem);
            inputSystem.addEventListener(shipMovementControlSystem);

            this.engine.addSystem(new FlightComputerProcessorSystem());

            const cameraControl = new CameraControlSystem(this.renderer.getCamera(), inputSystem);
            inputSystem.addEventListener(cameraControl);

            const laserHandlingSystem = new LaserHandlingSystem();
            this.engine.addSystem(laserHandlingSystem);

            const healthMonitoringSystem = new HealthMonitoringSystem();
            this.engine.addSystem(healthMonitoringSystem);

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

    .selectBox {
        border: 1px solid #55aaff;
        background-color: rgba(75, 160, 255, 0.3);
        position: fixed;
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
