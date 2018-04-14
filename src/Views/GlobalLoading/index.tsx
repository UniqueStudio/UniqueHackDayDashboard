import * as React from 'react';
import * as ReactDOM from 'react-dom';

import cls from './style.less';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers/index';
import Message from 'antd/es/message';
import debounce from 'lodash-es/debounce';
class GlobalLoading extends React.Component<{ isLoading: boolean }> {
  container: HTMLDivElement | null = null;
  blankRendered: boolean = false;
  render() {
    if (!this.props.isLoading) {
      return null;
    }
    if (!this.container) {
      return null;
    }
    if (this.blankRendered) {
      return null;
    }
    this.blankRendered = true;
    return ReactDOM.createPortal(
      <div className={cls['loading-wrapper']}>
        <div />
      </div>,
      this.container,
    );
  }

  close: (() => void) | null = null;

  componentWillReceiveProps(nextProps: { isLoading: boolean }) {
    const debounced = debounce(() => {
      if (this.close) {
        this.close();
        this.close = null;
      }
    }, 1000);
    if (nextProps.isLoading === !this.props.isLoading) {
      if (nextProps.isLoading) {
        if (!this.close) {
          this.close = Message.loading('正在加载');
        }
      } else {
        debounced();
      }
    }
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
