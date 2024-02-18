// CenteredCard.js
import React from 'react';
import { Card, Form, Input, Button } from 'antd';
// import './CenteredCard.css'; // Import your custom styles

const CenteredCard = () => {
  const onFinish = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className="centered-card-container">
      <Card title="Centered Card" className="centered-card">
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CenteredCard;
