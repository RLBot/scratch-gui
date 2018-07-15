import React from 'react';
import classNames from 'classnames';
import styles from './controller.css';
import Meter from './meter.jsx';
import bindAll from 'lodash.bindall';

class Controller extends React.Component {
    constructor (props) {
        super(props);

        this.state = {controller: {}};
        this.lastControllerUpdate = Date.now();

        bindAll(this, [
            'onControllerUpdate'
        ]);
    }

    onControllerUpdate (update) {   
        const target = this.props.target;
        if (target.rlbotType === 'car' && update.playerIndex === target.rlbotIndex && target.rlbotCommunication) {
            const now = Date.now();
            if (now - this.lastControllerUpdate > 100) {
                this.lastControllerUpdate = now;
                this.setState({controller: update.controller});
            }
        }
    }

    componentDidMount() {
        this.props.rlbotManager.addListener('controllerUpdate', this.onControllerUpdate);
    }

    componentWillUnmount() {
        this.props.rlbotManager.removeListener('controllerUpdate', this.onControllerUpdate);
    }

    render () {
        return (
            this.state.controller.throttle !== undefined ? (
            <div>
                <div style={{textAlign: 'right'}}>
                    <span className={classNames(styles.button, this.state.controller.jump ? styles.on : null)}>Jump</span>
                    <span className={classNames(styles.button, this.state.controller.boost ? styles.on : null)}>Boost</span>
                    <span className={classNames(styles.button, this.state.controller.handbrake ? styles.on : null)}>Handbrake</span>
                </div>
                <Meter val={this.state.controller.throttle} label='Throttle' />
                <Meter val={this.state.controller.steer} label='Steering' />
                <Meter val={this.state.controller.pitch} label='Pitch' />
                <Meter val={this.state.controller.yaw} label='Yaw' />
                <Meter val={this.state.controller.roll} label='Roll' />
                
            </div>
            ) : null
        );
    }

}

export default Controller;
