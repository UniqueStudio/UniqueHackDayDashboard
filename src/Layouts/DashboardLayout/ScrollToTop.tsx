import * as React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component<{ location: any; scrollToTop: any }> {
  componentDidUpdate(prevProps: any) {
    const { scrollToTop } = this.props;
    console.log(2);
    if (this.props.location !== prevProps.location) {
      scrollToTop && scrollToTop();
    }
  }

  render() {
    return this.props.children;
  }
}

export default (withRouter as any)(ScrollToTop);
