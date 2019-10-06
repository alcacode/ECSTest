import { Component, ComponentDataDescriptor } from './components.js';

namespace COMPONENTS {
        interface ICoordinates extends ComponentDataDescriptor {
                x: number;
                y: number;
        }

        class Coordinates extends Component {
                constructor() {
                        const a: ICoordinates = {x: 0, y: 0};
                        super(2, a);
                }
        }

        const x = new Coordinates();
        console.log(x);
}