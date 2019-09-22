import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {LoadoutComponent} from '@/engine/components/ship/LoadoutComponent';
import {HealthComponent} from '@/engine/components/ship/healthComponent';
import {Ship} from '@/engine/entities/ship';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {AU} from '@/engine/scalingHelper';
import {Weapon} from '@/engine/class/weapon';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {Vector3} from 'three';

class AutomatedFiringSystem extends System {
    protected loadoutFamily!: Family;
    protected damagables!: Family;

    protected readonly targetTeams: Record<number, number[]> = {
        1: [2],
        2: [1, 3],
        3: [],
    };

    public onAttach(engine: Engine): void {
        this.loadoutFamily = new FamilyBuilder(engine).include(LoadoutComponent).build();
        this.damagables    = new FamilyBuilder(engine).include(HealthComponent).build();
    }

    public update(engine: Engine, delta: number): void {
        this.loadoutFamily.entities.forEach((entity: Entity) => {
            if (entity instanceof Ship) {
                const attackerPosition = entity.getComponent(PositionComponent).getPosition();
                const targets          = this.getDamagablesInTeams(this.targetTeams[entity.team]);

                targets.forEach((defender: Entity) => {
                    const defenderPosition = defender.getComponent(PositionComponent).getPosition();

                    if (attackerPosition.manhattanDistanceTo(defenderPosition) < AU) {
                        this.fireWeapons(engine, entity, defender);
                    }
                });
            }
        });
    }

    protected getDamagablesInTeams(teams: number[]): Entity[] {
        return this.damagables.entities.filter((x: Entity) => {
            if (x instanceof Ship) {
                return teams.includes(x.team);
            }

            return false;
        });

    }

    protected fireWeapons(engine: Engine, attacker: Entity, defender: Entity) {
        const loadout = attacker.getComponent(LoadoutComponent);
        loadout.weapons.forEach((weapon: Weapon) => {
            if (weapon.canFire()) {
                const defenderPosition = defender.getComponent(PositionComponent).getPosition();
                const attackerPosition = attacker.getComponent(PositionComponent).getPosition();

                if (attackerPosition.distanceTo(defenderPosition) < weapon.range) {
                    console.log(`${attacker.name}(${attacker.team}) is firing on ${defender.name}(${defender.team})`);

                    const success = (Math.random() * 100) < weapon.accuracy;

                    if (success) {
                        console.log(`${attacker.name} hit ${defender.name}`);
                        weapon.fire();

                        defender.getComponent(HealthComponent).damage(weapon.damage);

                        if (defender.getComponent(HealthComponent).hull < 0) {
                            console.log(`${defender.name} DESTROYED`);
                            defender.getComponent(RenderComponent).mesh.position.copy(new Vector3(-1000000, -100000, -10000));
                            engine.removeEntity(defender);
                        }
                    }
                }

            }
        });


    }
}

export {AutomatedFiringSystem};
