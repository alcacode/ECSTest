export class CompactingArray<T> {
        private nextIndex: number         = 0;
        public head: number               = 0;
        protected data: Array<T | number> = [];
        readonly offset: number           = 1;

        constructor(indiciesPerAlloc?: number) {
                if (typeof indiciesPerAlloc === "number" && indiciesPerAlloc > 0
                        && (indiciesPerAlloc | 0) === indiciesPerAlloc) {
                        this.offset = indiciesPerAlloc;
                }
        }

        isValidSlotIndex(idx: number) {
                return idx !== undefined && idx >= 0 && idx < this.head && (idx | 0) === idx;
        }

        // Finds a free slot, marks it as occupied and returns its index
        // If clearSlots is set to true, sets allocated slots to 'undefined'
        alloc(clearSlots?: boolean): number {
                const idx = this.nextIndex;
                let nidx: any = this.data[this.nextIndex];

                if (typeof nidx !== "number") {
                        nidx = this.head + this.offset;
                        this.head += this.offset;
                }

                this.nextIndex = nidx;

                if (clearSlots)
                        this.clear(idx, this.offset);

                return idx;
        }

        // Mark slot(s) as free.
        free(idx: number): boolean {
                if (!this.isValidSlotIndex(idx) || idx % this.offset)
                        return false;

                this.data[idx] = this.nextIndex;
                this.nextIndex = idx;

                return true;
        }

        // Set n slots, starting at and including idx, to undefined.
        clear(idx: number, n: number) {
                if (!this.isValidSlotIndex(idx) || n < 1)
                        return false;

                for (let i = 0; i < n; i++)
                        this.data[idx + i] = undefined;

                return true;
        }

        set(idx: number, val: any) {
                if (!this.isValidSlotIndex(idx))
                        return undefined;

                return this.data[idx] = val;
        }

        get(idx: number) {
                return this.data[idx];
        }
}