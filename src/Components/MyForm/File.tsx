// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as TYPE from '../../redux/actions';
import Form from 'antd/es/form';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import { hostname } from '../../lib/const';
import Message from 'antd/es/message';
import { UploadFile } from 'antd/es/upload/interface';
import { connect } from 'react-redux';

const authorizationToken = () => sessionStorage.getItem('token') || localStorage.getItem('token');

export interface FileProps {
    noLayout?: boolean;
    id: string;
    required: boolean;
    fieldName: string;
    label: string;
    deleteFileDispatch: (id: string, type: string) => void;
}

class File extends React.Component<FileProps> {
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
            return uploaded.map(file => ({
                ...file,
                thumbUrl: undefined,
                id: file.response.data.fileId,
            }));
        }
        return null;
    };

    beforeUpload = (file: any) => {
        const isLt2M = file.size / 1024 / 1024 < 50;
        if (!isLt2M) {
            Message.error('文件大小不能超过 50MB！');
            return false;
        }
        return true;
    };

    removeFile = (file: UploadFile) => {
        const { id: type } = this.props;
        const fileId = file.uid;

        this.props.deleteFileDispatch(fileId, type);
    };

    render() {
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.context;
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
                    getFieldValue(this.props.id) === undefined ? (
                        <Upload
                            disabled={
                                (getFieldValue(this.props.id) || []).length > 0 ||
                                this.state.isUploading
                            }
                            multiple={false}
                            name={this.props.id}
                            action={`https://${hostname}/v1/files?t=` + this.props.id}
                            listType="picture"
                            headers={{ Authorization: `Bearer ${authorizationToken()}` }}
                            beforeUpload={this.beforeUpload}
                            onRemove={this.removeFile}
                        >
                            <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                                <Icon type="upload" /> 点击上传{this.props.fieldName}
                            </Button>
                        </Upload>
                    ) : (
                        <Upload
                            disabled={
                                (getFieldValue(this.props.id) || []).length > 0 ||
                                this.state.isUploading
                            }
                            multiple={false}
                            name={this.props.id}
                            action={`https://${hostname}/v1/files?t=` + this.props.id}
                            listType="picture"
                            headers={{ Authorization: `Bearer ${authorizationToken()}` }}
                            beforeUpload={this.beforeUpload}
                            defaultFileList={getFieldValue(this.props.id)}
                            onRemove={this.removeFile}
                        >
                            <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                                <Icon type="upload" /> 点击上传{this.props.fieldName}
                            </Button>
                        </Upload>
                    ),
                )}
            </Form.Item>
        );
    }

    static contextTypes = {
        form: PropTypes.object,
        size: PropTypes.string,
    };
}

export default connect(
    () => ({}),
    dispatch => ({
        deleteFileDispatch(id: string, type: string) {
            dispatch({
                type: TYPE.DELETE_FILE._,
                payload: {
                    id,
                    type,
                },
            });
        },
    }),
)(File);
