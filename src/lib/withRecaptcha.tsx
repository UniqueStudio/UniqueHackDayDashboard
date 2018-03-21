import * as React from 'react';
import Recaptcha from 'react-recaptcha';
import noop from 'lodash-es/noop';

export interface InjectedProps {
  withVerify: (callback: (token: string) => any) => () => Promise<void>;
  recaptchaReady: boolean;
}

export interface InjectedState {
  recaptchaLoaded: boolean;
}

function WithRecaptcha<P>(
  WrappedComponent: React.ComponentType<P & InjectedProps>,
): React.ComponentClass<P> {
  return class extends React.Component<P, InjectedState> {
    state = {
      recaptchaLoaded: false,
    };
    // About the recaptcha
    recaptcha = null;
    recaptchaRef = (recaptcha: any) => {
      this.recaptcha = recaptcha;
    };
    recaptchaResolve = noop;
    recaptchaReject = noop;
    verifyCallback = (token: string) => {
      this.recaptchaResolve(token);
    };
    expiredCallback = () => {
      this.recaptchaReject();
    };
    withRecaptcha = (callback: (token: string) => any) => {
      return async () => {
        await callback((await new Promise((resolve, reject) => {
          this.recaptchaResolve = resolve;
          this.recaptchaReject = reject;
          if (this.recaptcha) {
            (this.recaptcha as any).execute();
          }
        })) as string);
      };
    };
    handleRecaptchaLoaded = () => {
      this.setState({ recaptchaLoaded: true });
    };

    // HOC
    getDisplayName = () => `WithRecaptcha(${WrappedComponent.name})`;
    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            withVerify={this.withRecaptcha}
            recaptchaReady={this.state.recaptchaLoaded}
          />
          <Recaptcha
            sitekey="6LdC6U0UAAAAAKncjvziQGNOd2vLAPmVu2jTKDg9"
            size="invisible"
            render="explicit"
            onloadCallback={this.handleRecaptchaLoaded}
            verifyCallback={this.verifyCallback}
            expiredCallback={this.expiredCallback}
            ref={this.recaptchaRef}
          />
        </React.Fragment>
      );
    }
  };
}

export default WithRecaptcha;
