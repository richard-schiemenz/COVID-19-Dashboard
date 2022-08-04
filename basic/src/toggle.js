import React from "react";

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { id: this.props.id, togglables: this.props.togglables };
  }

  handleClick() {
    this.props.onInputChange(this.props.id);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="button">
        {this.props.isToggleOn
          ? this.state.togglables[0]
          : this.state.togglables[1]}
      </button>
    );
  }
}
