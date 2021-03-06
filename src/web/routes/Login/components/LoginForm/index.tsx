import { FormComponentProps } from 'antd/lib/form/Form';
import * as React from 'react';
import { Form, Input, Icon, Button } from "antd"

import "./style.less";
import { Link } from 'react-router-dom';


interface LoginFormProps extends FormComponentProps {

    onSubmit: (values) => any;
}


class LoginForm extends React.Component<LoginFormProps, {}> {

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }


    public render(): JSX.Element {
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [
                        { required: true, message: 'Please input your username!' },
                        { type: 'email', message: "邮箱格式不正确" }
                    ]
                })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <Link to="/regist">
                    没有账号,注册
                </Link>
            </Form.Item>
        </Form>
    }
}

export default Form.create()(LoginForm);
