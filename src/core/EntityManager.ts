import './components/Components.js';
import { CompactingArray } from '../../../lib/CompactingArray/CompactingArray.js';

export class EntityManager {
        private entityCount: number   = 0;
        private entities: CompactingArray<number>;

        constructor() {
                this.entityCount   = 0;
                this.entities      = new CompactingArray();
        }

        public create(): number {
                this.entityCount++;
                const entity_id = this.entities.alloc();
                this.entities.set(entity_id, 0);

                return entity_id;
        }

        public delete(entity_id: number): boolean {
                this.entityCount--;
                return this.entities.free(entity_id);
        }

        public addComponent(entity_id: number, component: number) {
                const entity = this.entities.get(entity_id);
                if (entity === undefined)
                        return;

                return this.entities.set(entity_id, entity | component);
        }
        
        public removeComponent(entity_id: number, component: number) {
                let entity = this.entities.get(entity_id);
                if (entity === undefined)
                        return;

                // Perform logical-AND first to prevent toggling component on
                // if it does not exist on the entity.
                return this.entities.set(entity_id, entity ^ (entity & component));;
        }

        public get numEntities(): number {
                return this.entityCount;
        }
}