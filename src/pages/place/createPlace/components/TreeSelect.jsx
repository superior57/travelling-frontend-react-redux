import React, { Component } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import isEqual from "lodash/isEqual";

export default class TreeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  componentWillReceiveProps = nextProps => {
    if (!isEqual(nextProps.data, this.state.data)) {
      this.setState({ data: nextProps.data });
    }
  };

  shouldComponentUpdate = nextProps => {
    return !isEqual(nextProps.data, this.state.data);
  };

  render() {
    const { data, ...rest } = this.props;
    return (
      <DropdownTreeSelect
        texts={{ placeholder: this.props.placeholder }}
        data={this.state.data}
        {...rest}
      />
    );
  }
}
