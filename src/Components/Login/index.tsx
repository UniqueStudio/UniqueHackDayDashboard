import * as React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';

// class LoginForm extends React.Component {
//   render() {
//     return (
//       <Form layout="horizontal">
//         <Form.Item
//           label="Success"
//           hasFeedback={true}
//           validateStatus="success"
//         >
//           <Input/>
//         </Form.Item>
//       </Form>
//     );
//   }
// }
const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 12 },
    xs: { span: 24 },
  },
};

export default class Login extends React.Component {
  render() {
    return (
      <Form layout="horizontal">
        <Form.Item
          {...formItemLayout}
          label="Success"
          hasFeedback={true}
          validateStatus="success"
        >
          <Input/>
        </Form.Item>
      </Form>
    );
  }
}
