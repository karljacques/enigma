<template>
    <div>
        <div v-for="component in indicatorComponents"
             style="position: fixed;"
             :style="convertScreenCoordinatesToCSSPosition(convertRelativeCoordinatesToScreenCoordinates(component.screenPosition))">
            {{ component.name }}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {engine} from '@/engine';
    import {EngineEntityListener, Entity} from '@nova-engine/ecs';
    import {SelectableComponent} from '@/engine/components/selection/selectableComponent';
    import {EventBus} from "@/eventBus";
    import {Ship} from "@/engine/entities/ship";
    import {EntityLocationIndicatorComponent} from "@/engine/components/render/entityLocationIndicatorComponent";
    import {Vector2} from "three";

    @Component
    export default class Overview extends Vue {
        indicatorComponents: Array<EntityLocationIndicatorComponent> = [];

        created() {
            EventBus.$on('entity-location-indicator-added', (entity: Entity) => {
                debugger;
                const component = entity.getComponent(EntityLocationIndicatorComponent);

                this.indicatorComponents.push(component);
            });

            EventBus.$on('before-entity-location-indicator-removed', (entity: Entity) => {
                const component = entity.getComponent(EntityLocationIndicatorComponent);

                const index = this.indicatorComponents.findIndex(x => x === component);
                if (index) {
                    this.indicatorComponents.splice(index, 1);
                }
            });
        }

        public convertRelativeCoordinatesToScreenCoordinates(relative: Vector2): Vector2 {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const halfWidth = width * 0.5;
            const halfHeight = height * 0.5;


            const x = (relative.x * halfWidth) + halfWidth;
            const y = -(relative.y * halfHeight) + halfHeight;
            return new Vector2(x, y);
        }

        public convertScreenCoordinatesToCSSPosition(screen: Vector2): string {
            return `top: ${screen.y}px; left: ${screen.x}px;`;
        }


    }
</script>

<style scoped>

</style>
