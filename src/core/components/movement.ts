import { Component, ComponentDataDescriptor } from './components.js';

namespace COMPONENTS {
        interface IMovement extends ComponentDataDescriptor {
                x: number;
                y: number;
                // Measured in pixels per second
                acceleration: number;
        }

        class Movement extends Component {
                constructor() {
                        const defaultValues: IMovement = {x: 0, y: 0, acceleration: 380};
                        super(3, defaultValues);
                }
        }
}