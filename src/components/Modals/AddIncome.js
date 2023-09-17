import React,{useState} from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  addTransaction
}) {
  const [form] = Form.useForm();
  const [showCustomInputIncome, setShowCustomInputIncome] = useState(false);
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

    setShowCustomInputIncome(false)
    
  };
  

  const toggleCustomInputIncome = () => {
    setShowCustomInputIncome(!showCustomInputIncome);
  };
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
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
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>
        {/* <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            {/* Add more tags here */}
          {/* </Select> */}
        {/* </Form.Item> */} 
        <Form.Item label="Tag" name="tag" style={{ fontWeight: 600 }}>
          <Select
            className="select-input-2"
            onChange={(value) => {
              // If the selected value is "custom", show the custom input field
              if (value === "custom") {
                toggleCustomInputIncome();
              } else {
                setShowCustomInputIncome(false);
              }
            }}
          >
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">investment</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
        </Form.Item>
        {showCustomInputIncome && (
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
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
