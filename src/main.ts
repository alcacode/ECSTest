import { EntityManager } from "./core/EntityManager.js";
import { ComponentManager } from "./core/ComponentManager.js";

class World {
        public entityManager: EntityManager;
        public componentManager: ComponentManager;

        constructor() {
                this.entityManager = new EntityManager();
                this.componentManager = new ComponentManager();
        }

        public createEntity(): number {
                return this.entityManager.create();
        }

        public removeEntity(entityID: number): boolean {
                return this.entityManager.delete(entityID);
        }
}

const x = new World();
console.log(x);