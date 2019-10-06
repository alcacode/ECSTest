import { CompactingArray } from '../../../../lib/CompactingArray/CompactingArray.js';
/// <reference path="Components.d.ts" />

export const component_list: Array<Component> = [];

export interface ComponentDataDescriptor {
        [key: string]: any
};

export abstract class Component {
        protected data: CompactingArray<number|string>;
        protected entity_map: Array<number> = [];
        protected numColumns: number;
        protected archetype: ComponentDataDescriptor;
        protected columnKeys: Array<string>;
        protected keyIndex: {[key: string]: number};

        constructor(numColumns: number, archetype: ComponentDataDescriptor, ...args: any) {
                this.data        = new CompactingArray(numColumns);
                this.numColumns  = this.data.offset;
                this.archetype   = archetype;
                this.columnKeys  = Object.keys(archetype);
                this.keyIndex    = {};

                for (let i = 0; i < this.columnKeys.length; i++)
                        this.keyIndex[this.columnKeys[i]] = i;

                component_list.push(this);
        }

        hasEntity(entity_id: number) {
                return this.entity_map[entity_id] !== undefined && this.entity_map[entity_id] !== -1;
        }

        allocate(entity_id: number): boolean {
                if (this.hasEntity(entity_id))
                        return false;

                this.entity_map[entity_id] = this.data.alloc();

                // Assign default values
                for (let i = 0; i < this.numColumns; i++)
                        this.data.set(this.entity_map[entity_id] + i, this.archetype[this.columnKeys[i]]);

                return true;
        }

        deallocate(entity_id: number) {
                if (!this.hasEntity(entity_id))
                        return;

                if (this.data.free(this.entity_map[entity_id]))
                        this.entity_map[entity_id] = -1;
                else
                        throw new Error(`could not free index '${this.entity_map[entity_id]}`);
        }

        get(entity_id: number, k: string): any {
                return this.data.get(this.entity_map[entity_id] + this.keyIndex[k]);
        }

        set(entity_id: number, k: string, v: any): typeof v {
                if (typeof this.archetype[k] !== typeof v)
                        throw new TypeError(`unexpected value type '${typeof v}' to '${this.columnKeys[this.keyIndex[k]]}', expected '${typeof this.archetype[k]}'`);

                return this.data.set(this.entity_map[entity_id] + this.keyIndex[k], v);
        }
}
export const componentFieldByteSize = 8;
export const enum comp_ids {
        C_NONE                = 0,
        C_INPUT               = 1 <<  1,
        C_RENDERABLE          = 1 <<  2,
        C_AUDIO               = 1 <<  3,
        C_RECIEVES_LIGHT      = 1 <<  4,
        C_LIGHT_SOURCE        = 1 <<  5,
        C_AI                  = 1 <<  6,
        C_SIZE                = 1 <<  7,
        C_COORDINATES         = 1 <<  8,
        C_MOVEMENT            = 1 <<  9,
        C_COLLISION           = 1 << 10,
        C_AFFECTED_BY_GRAVITY = 1 << 11,
        C_MASS                = 1 << 12,
        C_INVENTORY           = 1 << 13,
        C_GRAPHIC_ASSETS      = 1 << 14,
        C_AUDIO_ASSETS        = 1 << 15,
        C_SCRIPT_ASSETS       = 1 << 16,
        C_STATIC              = 1 << 17,
        C_DESTRUCTABLE        = 1 << 18,
        C_COLOR               = 1 << 19,
        C_ALPHA               = 1 << 20,
        C_CLICKABLE           = 1 << 21,
        C_FRICTION            = 1 << 22,
        C_IS_PET              = 1 << 23,
        C_OWNER               = 1 << 24,
        C_CONTROLLABLE        = 1 << 25,
}