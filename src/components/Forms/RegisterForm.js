import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Checkbox, Select, Radio, Divider, Tag, InputNumber } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'react-router-dom/Link';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
const { Title, Text } = Typography;

function SignupForm (props) {
    const [state, setState] = useState({
            firstName: "",
            lastName: "",
            birth: "",
            birthYear: undefined,
            birthMonth: undefined,
            birthDay: undefined,
            gender: 0,
            phoneNumber: 0
        });
        
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        });
    }

    const onChange = (value) => {
        setState({
            ...state,
            phoneNumber : value
        });
    }
    const tagRender = (props) => {
        const { label, closable, onClose } = props;
      
        return (
          <Tag color="#ff3333" closable={closable} onClose={onClose} style={{ margin: 3 }}>
            {label}
          </Tag>
        );
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const phoneType = ["cell", "cell2", "cell3"];
    const children = ["White", "Black/African American", "Asian", "Mediterranean", "Pacific Islander", "Hispanic", "American Indian", "Other", "Indian", "Middle Eastern"];

    return(
        <div style={{padding:"30px 150px"}}>
            <Form name="basic"
                initialValues={
                    {names:["a"]}
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Title level={4} align="center">Account Registration</Title>
                <Title level={3} align="center">Patient Info</Title>
                <Row gutter={24} style={{color : "maroon", fontSize:18, fontWeight:600}}>
                    <Col xs={{ span: 18 }} lg={{ span: 8 }}>
                        <p> First Name<Text style={{fontSize:12}} type="danger"> (Required)</Text></p>
                        <Form.Item
                            value={state.firstName}
                            name="firstName"
                            onChange={handleChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!'
                                },
                            ]}
                        >
                            <Input style={{marginBottom:16}} />
                        </Form.Item>
                        <p> Last Name<Text style={{fontSize:12}} type="danger"> (Required)</Text></p>
                        <Form.Item
                            value={state.lastName}
                            onChange={handleChange}
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!'
                                },
                            ]}
                        >
                            <Input style={{marginBottom:16}} />
                        </Form.Item>
                        <p> Date of Birth<Text style={{fontSize:12}} type="danger"> (Required)</Text></p>
                        <Form.Item
                            name="birth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Date of Birth!'
                                },
                            ]}
                        >
                            <Row gutter={8} style={{marginBottom:16}}>
                                <Col span={8} key={0}><InputNumber min={1} max={12} name="birthMonth" value={state.birthMonth} onChange={(value) => setState({...state, birthMonth : value})} placeholder="MM" /></Col>
                                <Col span={8} key={1}><InputNumber min={1} max={31} name="birthDay" value={state.birthDay} onChange={(value) => setState({...state, birthDay : value})} placeholder="DD" /></Col>
                                <Col span={8} key={2}><InputNumber min={1990} name="birthYear" value={state.birthYear} onChange={(value) => setState({...state, birthYear : value})} placeholder="YYYY" /></Col>
                            </Row>
                        </Form.Item>
                        <p> Gender<Text style={{fontSize:12}} type="danger"> (Required)</Text></p>
                        <Form.Item
                            name="gender"
                            value={state.gender}
                            onChange={handleChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your Gender!'
                                },
                            ]}
                        >
                            <Radio.Group style={{width:"100%"}}>
                                <Radio value={1} style={{color : "maroon", fontSize:18, fontWeight:600}} >
                                    Male
                                </Radio><br />
                                <Radio value={2} style={{color : "maroon", fontSize:18, fontWeight:600}}>
                                    Female
                                </Radio><br />
                                <Radio value={3} style={{color : "maroon", fontSize:18, fontWeight:600}}>
                                    Transgender
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 18 }} lg={{ span: 8 }}>
                        <p>Ethinicity<Text style={{fontSize:12}} type="secondary"> (may select more than one)</Text></p>
                        <Checkbox style={{marginBottom:16, color : "maroon", fontSize:18}}>Prefer not to say</Checkbox>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            placeholder='please select'
                            style={{width:"100%"}}
                        >
                            {children.map((item, index) => {
                                return <Select.Option key={index}>{item}</Select.Option>
                            })}
                        </Select>
                    </Col>
                    <Col xs={{ span: 18 }} lg={{ span: 8 }}>
                        <Form.List name="names" >
                            {(fields, { add, remove }) => (
                            <div>
                                {fields.map(field => (
                                <div key={field.key}>
                                    <p>Phone Number<Text style={{fontSize:12}} type="danger"> (Required)</Text></p>
                                    <Form.Item
                                    {...field}
                                    name={[field.name, 'phoneNumber']}
                                    fieldKey={[field.fieldKey, 'phoneNumber']}
                                    onChange={onChange}
                                    rules={[{ required: true, message: 'Missing Phone Number' }]}
                                    style={{color : "maroon", fontSize:18, fontWeight:600}}
                                    >
                                    <PhoneInput placeholder="(___)-___-___" style={{width: "100%"}}  />
                                    </Form.Item>
                                    <p>Phone Type</p>
                                    <div style={{display: "flex"}}>
                                    <Select
                                        mode="single"
                                        placeholder='please select phone type'
                                        style={{width:"100%"}}
                                    >
                                        {phoneType.map((item, index) => {
                                            return <Select.Option key={index}>{item}</Select.Option>
                                        })}
                                    </Select>
                                    <Button type="default" icon={<CloseOutlined />}></Button>
                                    </div>
                                    {field.name !== 0 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                                    <Divider />
                                </div>
                                ))}
                                <Button
                                    type="link"
                                    onClick={() => {console.log(fields); add()}}
                                    // block
                                    icon={<PlusCircleOutlined />}
                                    style={{marginLeft:0,marginBottom:16, color:"maroon"}}
                                >
                                    <u> Add Phones</u>
                                </Button>
                            </div>
                            )}
                        </Form.List>
                        
                        <p>{"Terms & Conditions"}</p>
                    
                        <Checkbox className="term">I agree to the following. <Link to="/" style={{color:"maroon"}}>Terms of Use, HIPAA Security Agreement</Link></Checkbox>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
export default SignupForm;
