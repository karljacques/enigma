import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {LoadoutComponent} from '@/engine/components/ship/LoadoutComponent';
import {HealthComponent} from '@/engine/components/ship/healthComponent';
import {Ship} from '@/engine/entities/ship';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {AU} from '@/engine/scalingHelper';
import {LaserWeapon} from '@/engine/class/laserWeapon';

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
        loadout.weapons.forEach((weapon: LaserWeapon) => {
            if (weapon.canFire()) {
                const defenderPosition = defender.getComponent(PositionComponent).getPosition();
                const attackerPosition = attacker.getComponent(PositionComponent).getPosition();

                if (attackerPosition.distanceTo(defenderPosition) < weapon.range) {
                    weapon.fire(attacker, defender);
                }
            }
        });


    }
}

export {AutomatedFiringSystem};
