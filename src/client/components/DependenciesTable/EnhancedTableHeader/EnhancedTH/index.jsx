import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ArrowUpward } from '@material-ui/icons';

import { TableContext } from '../../table-context';

const TH = styled.th`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-size: 12px;

  svg {
    height: 16px;
    width: 16px;
    fill: black;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.numeric ? 'flex-end' : 'center')};
  height: 48px;
  padding: 4px 16px;
  /* padding-right: 16px !important; */
`;
const Text = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 12px;

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${props => (props.active ? '#000' : 'rgba(0, 0, 0, 0.54)')};
  transform: ${props =>
    props.sortable && props.active
      ? 'translateX(0)'
      : props.sortable
        ? 'translateX(-18px)'
        : ''};
`;
const Btn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 48px;
  width: 100%;
  padding: 4px 16px;
  padding-right: 16px !important;
  background: none;
  border: none;
  margin: 0;
  -webkit-appearance: none;
  cursor: pointer;
  outline: 0;
`;
const IconWrapper = styled.div`
  margin-right: 4px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => (props.vertical ? 'rotateX(0deg)' : 'rotateX(180deg)')};

  svg {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => (props.active ? 'scale(1)' : 'scale(0)')};
  }
`;

class EnhancedTH extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    ascSort: PropTypes.bool,
    activeSortingParam: PropTypes.string,
    setSortingParam: PropTypes.func,
    numeric: PropTypes.bool
  };
  static defaultProps = {
    sortable: false,
    ascSort: true,
    numeric: false,
    activeSortingParam: ''
  };

  render() {
    return (
      <TableContext.Consumer>
        {({ setSortingParam, activeSortingParam, ascSort }) => (
          <TH>
            {this.props.sortable ? (
              <Btn onClick={_ => setSortingParam(this.props.header)}>
                <IconWrapper
                  vertical={ascSort}
                  active={activeSortingParam === this.props.header}
                >
                  <ArrowUpward />
                </IconWrapper>
                <Text
                  active={activeSortingParam === this.props.header}
                  sortable={this.props.sortable}
                >
                  {this.props.header}
                </Text>
              </Btn>
            ) : (
              <TextWrapper numeric={this.props.numeric}>
                <Text sortable={this.props.sortable}>{this.props.header}</Text>
              </TextWrapper>
            )}
          </TH>
        )}
      </TableContext.Consumer>
    );
  }
}

export default EnhancedTH;
