import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';

export interface TeamUpFormProps {
  onSubmit: () => void;
}

class TeamUpForm extends React.Component<TeamUpFormProps & FormComponentProps> {
  handleSubmit = () => void 0;

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="teamup" style={{ paddingTop: '20px' }}>
        ''
      </Form>
    );
  }
}

export default TeamUpForm;
