import {Engine, Entity, Family, FamilyBuilder, System} from '@nova-engine/ecs';
import {LoadoutComponent} from '@/engine/components/ship/LoadoutComponent';
import {HealthComponent} from '@/engine/components/ship/healthComponent';
import {Ship} from '@/engine/entities/ship';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {LaserWeapon} from '@/engine/class/laserWeapon';

class AutomatedFiringSystem extends System {
    protected loadoutFamily!: Family;

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
        // TODO: Look at spacial partitioning
        this.loadoutFamily.entities.forEach((entity: Entity) => {
            if (entity instanceof Ship) {
                this.loadoutFamily.entities.forEach((target: Entity) => {
                    if (target instanceof Ship) {
                        if (this.targetTeams[entity.team].includes(target.team)) {
                            this.fireWeapons(engine, entity, target);
                        }
                    }
                });
            }
        });
    }

    protected fireWeapons(engine: Engine, attacker: Entity, defender: Entity) {
        const loadout = attacker.getComponent(LoadoutComponent);
        loadout.weapons.forEach((weapon: LaserWeapon) => {
            if (weapon.canFire()) {
                const defenderPosition = defender.getComponent(PositionComponent).getPosition();
                const attackerPosition = attacker.getComponent(PositionComponent).getPosition();

                if (attackerPosition.distanceToSquared(defenderPosition) < (weapon.range * weapon.range)) {
                    weapon.fire(attacker, defender);
                }
            }
        });


    }
}

export {AutomatedFiringSystem};
