import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

// COMPONENTS AND STYLES
import { Input, FormGroup } from 'reactstrap';
import styled from 'styled-components';

const FormGroupStyled = styled(FormGroup)`
  display: flex;
  justify-content: space-between;
  > input {
    max-width: ${(props) => (props.children[0].props.width === '15' ? 15 : 31)}% !important;
  }
`;

export class RangeSlider extends React.PureComponent {
  state = {
    current_value_min: 0,
    current_value_max: 0
  };

  componentDidMount(prevProps) {
    // liftUpCapacity && liftUpCapacity(this.state.min, this.state.max);
    // liftUpSquare && liftUpSquare(this.state.min, this.state.max);
    // liftUpPrice && liftUpPrice(this.state.min, this.state.max);
    console.warn('componentDidMount');
    console.log('this.props', this.props);
    const { value_min, value_max } = this.props;
    this.setState({
      current_value_min: value_min,
      current_value_max: value_max
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.warn('componentDidUpdate');
    console.log('prevProps :', prevProps);
    console.log('this.props', this.props);
    if (
      prevProps.isDisabled !== this.props.isDisabled &&
      prevProps.value_min !== this.props.value_min &&
      (this.props.liftUpCapacity || this.props.liftUpSquare || this.props.liftUpPrice)
    ) {
      console.log('DID UPDATE CONDITION');
      this.setState(
        {
          current_value_min: this.props.value_min,
          current_value_max: this.props.value_max
        },
        () => console.log('current_value_min', this.state.current_value_min)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.min !== this.props.min) {
      this.setState({
        current_value_min: nextProps.min,
        current_value_max: nextProps.min
      });
    }
  }

  onSliderChange = (value) => {
    console.warn('onSliderChange');

    const { liftUpCapacity, liftUpSquare, liftUpPrice } = this.props;
    console.log('this.state', this.state);
    console.log('this.props', this.props);

    // if (value.length) {
    console.log('value :', value);
    this.setState(
      {
        current_value_min: value[0],
        current_value_max: value[1]
      },
      () => {
        liftUpCapacity && liftUpCapacity(value[0], value[1]);
        liftUpSquare && liftUpSquare(value[0], value[1]);
        liftUpPrice && liftUpPrice(value[0], value[1]);
      }
    );
    // }
  };

  onMinChange = (e) => {
    console.warn('onMinChange');

    const { liftUpCapacity, liftUpSquare, liftUpPrice } = this.props;

    if (isNaN(e.target.value)) return;
    const currentValue = +e.target.value;
    console.log('+e.target.value', +e.target.value);

    this.setState(
      {
        current_value_min: currentValue
      },
      () => {
        liftUpCapacity && liftUpCapacity(currentValue, this.state.current_value_max);
        liftUpSquare && liftUpSquare(currentValue, this.state.current_value_max);
        liftUpPrice && liftUpPrice(currentValue, this.state.current_value_max);
      }
    );
  };

  onMaxChange = (e) => {
    console.warn('onMaxChange');

    const { liftUpCapacity, liftUpSquare, liftUpPrice } = this.props;

    if (isNaN(e.target.value)) return;
    const currentValue = +e.target.value;

    this.setState(
      {
        current_value_max: currentValue
      },
      () => {
        liftUpCapacity && liftUpCapacity(this.state.current_value_min, currentValue);
        liftUpSquare && liftUpSquare(this.state.current_value_min, currentValue);
        liftUpPrice && liftUpPrice(this.state.current_value_min, currentValue);
      }
    );
  };

  render() {
    console.warn('render');
    const { current_value_min, current_value_max } = this.state;
    const { width, isDisabled, min, max } = this.props;
    console.log('this.props :************', this.props);
    return (
      <div>
        {console.log('current_value_min', current_value_min)}
        {console.log('current_value_max', current_value_max)}
        {console.log('max', max)}
        {console.log('min', min)}

        <Range
          disabled={isDisabled}
          value={[current_value_min || 0, current_value_max || max || 0]}
          onChange={min && max && this.onSliderChange}
          min={min}
          max={max}
          step={1}
          allowCross={false}
        />
        <FormGroupStyled>
          <Input
            disabled={isDisabled}
            width={width}
            value={current_value_min}
            onChange={this.onMinChange}
          />
          <Input
            disabled={isDisabled}
            width={width}
            value={current_value_max}
            onChange={this.onMaxChange}
          />
        </FormGroupStyled>
      </div>
    );
  }
}
