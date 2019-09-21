<template>
    <div>
        <h1>Overview</h1>
        <div>
            <h4>Selected Ships</h4>
            <ul>
                <li v-for="entity in selected">
                    {{ entity.id }}
                </li>
            </ul>
        </div>
    </div>


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {engine} from '@/engine';
    import {EngineEntityListener, Entity} from '@nova-engine/ecs';
    import {SelectableComponent} from '@/engine/components/selection/selectableComponent';

    @Component
    export default class Overview extends Vue implements EngineEntityListener {
        protected entities: Array<Entity> = [];

        created() {
            engine.addEntityListener(this);
        }

        get selectables() {
            return this.entities.filter((entity: Entity) => {
                return entity.hasComponent(SelectableComponent);
            });
        }

        get selected() {
            return this.selectables.filter((entity: Entity) => {
                return entity.getComponent(SelectableComponent).isSelected();
            });
        }

        onEntityAdded(entity: Entity): void {
            this.entities.push(entity);
        }

        onEntityRemoved(entity: Entity): void {
            const index = this.entities.findIndex(x => x === entity);
            if (index !== -1) {
                this.entities.splice(index);
            }
        }


    }
</script>

<style scoped>
    * {
        color: white;
    }
</style>
