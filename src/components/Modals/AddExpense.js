import React,{useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  addTransaction
}) {
  const [form] = Form.useForm();
  const [showCustomInput, setShowCustomInput] = useState(false);

  const onFinish = (values, type) => {
    //    console.log("onFinish", values, type)
    // console.log(values);

    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag==="custom"?values.customTag : values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    setShowCustomInput(false)
    
  };
  

  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput);
  };
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        {/* <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
            {/* Add more tags here */}
          {/* </Select> */}
        {/* </Form.Item> */} 
        <Form.Item label="Tag" name="tag" style={{ fontWeight: 600 }}>
          <Select
            className="select-input-2"
            onChange={(value) => {
              // If the selected value is "custom", show the custom input field
              if (value === "custom") {
                toggleCustomInput();
              } else {
                setShowCustomInput(false);
              }
            }}
          >
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
        </Form.Item>
          {/* Custom input for the "Tag" field */}
          {showCustomInput && (
          <Form.Item
            label="Custom Tag"
            name="customTag"
            style={{ fontWeight: 600 }}
            rules={[
              { required: true, message: "Please enter a custom tag!" },
            ]}
          >
            <Input type="text" className="custom-input"/>
          </Form.Item>
        )}
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;