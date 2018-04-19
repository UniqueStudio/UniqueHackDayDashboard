import * as React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component<{ location: any; scrollToTop: () => void }> {
  componentDidUpdate(prevProps: any) {
    const { scrollToTop } = this.props;

    if (this.props.location !== prevProps.location) {
      scrollToTop();
    }
  }

  render() {
    return this.props.children;
  }
}

export default (withRouter as any)(ScrollToTop);
