import React from 'react';
import classNames from 'classnames';
import styles from './controller.css';

class Meter extends React.Component {
    constructor (props) {
        super(props);
    }

    clamp (val) {
        if (val > 1) {
            return 1;
        }
        if (val < -1) {
            return -1;
        }
        return val;
    }

    render () {

        const clamped = this.clamp(this.props.val)
        const percentage = Math.abs(clamped * 50);
        const marginLeft = clamped > 0 ? 50 : 50 - percentage;

        return (
            <div className={classNames(styles.meterContainer)}>
                <div class={classNames(styles.middleMark)}></div>
                <div class={classNames(styles.meter)} style={{marginLeft: marginLeft + '%', width: percentage + '%'}}></div>
                <div class={classNames(styles.meterLabel)}>{this.props.label}</div>
            </div>
        );
    }

}

export default Meter;
