import React from 'react';
import moment from 'moment';
import "./countdown.css"
class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate } = this.props;
            const then = timeTillDate
            const now = moment();
            let countdown = then.diff(now,'seconds');
            const hours = Math.floor(countdown/3600);
            countdown-=hours*3600
            const minutes = Math.floor(countdown/60);
            countdown-=minutes*60
            const seconds = countdown;

            this.setState({ hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { hours, minutes, seconds } = this.state;


        if (!seconds) {
            return null;
        }

        return (
            <div>
                <div className="countdown-wrapper">
                    {hours && (
                        <div className="countdown-item">
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes && (
                        <div className="countdown-item">
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className="countdown-item">

                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default Countdown


