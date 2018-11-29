import React from "react";
import PropTypes from "prop-types";

import RoundRefreshIcon from "./round-refresh-icon";
import "./styles.css";

class PullDownAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorPosition: -50,
      start: 0,
      distance: 0,
      thresholdActivate: 20,
      thresholdRefresh: 80,
      maxOffset: 70
    };
  }

  componentDidMount() {
    document.addEventListener("touchstart", e => {
      this.setState({ start: e.touches[0].pageY });
    });
    document.addEventListener(
      "touchmove",
      e => {
        const { thresholdActivate, start } = this.state;
        const distanceY = e.touches[0].pageY - start;
        if (distanceY > thresholdActivate) {
          this.setState({ distance: Number.parseInt(distanceY.toFixed(0)) });
          if (e.cancelable) e.preventDefault();
        }
      },
      { passive: false }
    );
    document.addEventListener("touchend", e => {
      const { distance, thresholdRefresh } = this.state;
      if (distance >= thresholdRefresh) {
        const { onAction } = this.props;
        if (onAction) onAction();
      }
      this.setState({ start: 0, distance: 0 });
    });
  }

  render() {
    const {
      distance,
      thresholdActivate,
      thresholdRefresh,
      maxOffset,
      indicatorPosition
    } = this.state;
    const calcPosition = indicatorPosition + distance;
    const style = {
      top: calcPosition > maxOffset ? maxOffset : calcPosition
    };
    const innerStyle = { transform: `rotate(${calcPosition}deg)` };

    let classes =
      distance >= thresholdActivate && distance < thresholdRefresh
        ? "progress"
        : "";
    classes = distance >= thresholdRefresh ? "action" : classes;

    return (
      <div className={`pull-down-action ${classes}`} style={style}>
        <div className="pull-down-action-inner-wrapper" style={innerStyle}>
          <RoundRefreshIcon />
        </div>
      </div>
    );
  }
}

PullDownAction.propTypes = {
  onAction: PropTypes.func
};

export default PullDownAction;
