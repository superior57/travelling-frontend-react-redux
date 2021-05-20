import React from 'react';
import styled from 'styled-components';

import nextPageImg from '../../../assets/icons/arrowRight.png';

const PaginationList = styled.div`
  margin: 20px 0;
  display: flex;
  top: 0;
  left: 0;
  justify-content: flex-start;
`;

const ButtonActive = styled.button`
  background: #04d2ff;
  margin-left: 5px;
  padding: 3px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  color: white;
`;
const Button = styled.button`
  margin-left: 5px;
  padding: 3px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  color: #c4c5ce;
`;

const NextList = styled.button`
  border: none;
`;

class Pagination extends React.PureComponent {
  state = {
    totalPages: null
  };

  componentDidMount() {
    this.calculateTotalPages();
  }

  getPageRange = () => {
    // const left = this.props.activePage - this.props.pageRangeDisplayed;
    // const right = this.props.activePage + this.props.pageRangeDisplayed;

    const left = 1;
    const right = 5;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = left; i <= right; i++) {
      if (i < this.state.totalPages && i > 1) {
        range.push(i);
      }
    }
    range.push(this.state.totalPages);

    for (const i of range) {
      // if (l) {
      //   // if (i - l === 2) {
      //   //   rangeWithDots.push(l + 1);
      //   // } else if (i - l !== 1) {
      //   //   rangeWithDots.push('...');
      //   // }
      //   // rangeWithDots.push(l + 1);
      //   rangeWithDots.push(l );
      // }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  calculateTotalPages = () => {
    // this.setState({ totalPages });
  };

  nextPage = () => {
    if (this.props.activePage < this.state.totalPages) {
      this.props.onChange(this.props.activePage + 1);
    }
  };

  render() {
    // console.log('paging', this.props);
    return (
      <PaginationList>
        {this.getPageRange(this.state.totalPages).map((x, i) => (
          <div key={i}>
            {x == '1' ? <ButtonActive>{x}</ButtonActive> : <Button key={i}>{x}</Button>}
          </div>
        ))}
        <NextList onClick={this.nextPage}>
          <img src={nextPageImg} alt="Next page" />
        </NextList>
      </PaginationList>
    );
  }
}

export default Pagination;
