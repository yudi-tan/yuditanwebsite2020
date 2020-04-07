import React from "react";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";

class TerminalComponent extends React.Component {
  _input;

  componentDidUpdate(prevProps, prevState) {
    this._input.focus();
  }

  componentDidMount() {
    this._input.focus();
  }

  render() {
    const date = moment();
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currDay = days[date.day()];
    const currMon = months[date.month()];
    const currTime = date.format("HH:mm:ss");
    return (
      <div>
        <p id="welcome">
          Last login: {currDay} {currMon} {date.date()} {currTime} on ttys000
        </p>
        <OutsideClickHandler onOutsideClick={() => this._input.focus()}>
          <div>
            <span id="arrow">➜</span>
            <span id="dir"> ./yuditan.com</span> <span id="git">git:(</span>
            <span id="gitbranch">master</span>
            <span id="git">)</span> <span id="cross">✗</span>
            <input
              autoFocus={true}
              ref={(c) => (this._input = c)}
              type="text"
              maxLength="8"
              id="cmd"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

export default TerminalComponent;
