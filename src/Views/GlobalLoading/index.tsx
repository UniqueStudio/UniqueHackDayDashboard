import * as React from 'react';
import * as ReactDOM from 'react-dom';

import cls from './style.less';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers/index';

class GlobalLoading extends React.Component<{ isLoading: boolean }> {
  container: HTMLDivElement | null = null;
  render() {
    if (!this.props.isLoading) {
      return null;
    }
    if (!this.container) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className={cls['loading-wrapper']}>
        <div />
      </div>,
      this.container,
    );
  }
  componentWillMount() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    if (this.container) {
      document.body.removeChild(this.container);
    }
  }
}

export default connect((state: RootState) => ({ isLoading: state.loadingCount > 0 }))(
  GlobalLoading,
);
