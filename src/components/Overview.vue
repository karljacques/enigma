<template>
    <v-row>
        <v-col>
            <v-card v-if="selected.length">
                <v-card-title>Selected Ships</v-card-title>
                <v-card-text>
                    <ul>
                        <li v-for="entity in selected">
                            {{ entity.name }}
                        </li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-col>
        ♦
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
    </v-row>


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
            console.log('created');

            engine.entities.forEach((entity: Entity) => {
                this.entities.push(entity);
            });
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
            console.log('onEntityAdded');
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

</style>
