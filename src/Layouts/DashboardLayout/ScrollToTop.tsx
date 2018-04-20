import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface ScrollToTopProps extends RouteComponentProps<{}> {
  scrollToTop: () => void;
}

class ScrollToTop extends React.Component<ScrollToTopProps> {
  componentDidUpdate(prevProps: ScrollToTopProps) {
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
