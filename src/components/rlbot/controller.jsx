import React from 'react';
import classNames from 'classnames';
import styles from './controller.css';
import Meter from './meter.jsx';

class Controller extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        console.log(!!this.props.cs.jump);

        return (
            <div>
                <div style={{textAlign: 'right'}}>
                    <span className={classNames(styles.button, this.props.cs.jump ? styles.on : null)}>Jump</span>
                    <span className={classNames(styles.button, this.props.cs.boost ? styles.on : null)}>Boost</span>
                    <span className={classNames(styles.button, this.props.cs.handbrake ? styles.on : null)}>Handbrake</span>
                </div>
                <Meter val={this.props.cs.throttle} label='Throttle' />
                <Meter val={this.props.cs.steer} label='Steering' />
                <Meter val={this.props.cs.pitch} label='Pitch' />
                <Meter val={this.props.cs.yaw} label='Yaw' />
                <Meter val={this.props.cs.roll} label='Roll' />
                
            </div>
        );
    }

}

export default Controller;
