import { Component, component_list } from "./components/Components.js";

export class ComponentManager {
        private data: Map<number, object>;
        public a: Array<Component>;

        constructor() {
                this.data = new Map<number, object>();
                this.a = component_list;
        }
}