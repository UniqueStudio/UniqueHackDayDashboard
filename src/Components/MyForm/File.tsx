// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';

const authorizationToken = () => sessionStorage.getItem('token') || localStorage.getItem('token');

export interface FileProps {
  noLayout?: boolean;
  id: string;
  required: boolean;
  fieldName: string;
  label: string;
}

export default class File extends React.Component<FileProps> {
  state = {
    isUploading: false,
  };

  eventToFileId = (e: UploadChangeParam) => {
    this.setState({ isUploading: true });
    const uploaded = e.fileList.filter(file => file.status === 'done');
    if (e.fileList.length === uploaded.length || e.file.status === 'error') {
      this.setState({ isUploading: false });
    }
    if (uploaded.length > 0) {
      return uploaded.map(file => file.response.data.fileId);
    }
    return null;
  };

  render() {
    const { form: { getFieldDecorator } } = this.context;
    const { noLayout } = this.props;
    const formItemLayout = {
      labelCol: { xl: 8, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };
    return (
      <Form.Item
        {...(!noLayout ? formItemLayout : {})}
        hasFeedback={false}
        validateStatus={this.state.isUploading ? 'warning' : undefined}
        help={this.state.isUploading ? '正在上传...' : undefined}
        label={`上传${this.props.label}`}
      >
        {getFieldDecorator(this.props.id, {
          rules: [
            {
              required: this.props.required,
              message: `请上传${this.props.fieldName}`,
            },
          ],
          getValueFromEvent: this.eventToFileId,
        })(
          <Upload
            multiple={false}
            name={this.props.id}
            action="https://backend.fredliang.cn/v1/file/files"
            listType="picture"
            headers={{ Authorization: `Bearer ${authorizationToken()}`, }}
          >
            <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
              <Icon type="upload" /> 点击上传{this.props.fieldName}
            </Button>
          </Upload>,
        )}
      </Form.Item>
    );
  }

  static contextTypes = {
    form: PropTypes.object,
    size: PropTypes.string,
  };
}
