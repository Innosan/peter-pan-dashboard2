import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";

import { IHotDeal, ICategory } from "interfaces";

export const HotDealCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IHotDeal>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "category",
        filters: [
            {
                field: "parent_id",
                operator: "null",
                value: null
            }
        ]
    });

    console.log(categorySelectProps)

    const discountSelect = [
        {
            id: 1,
            value: 10
        },
        {
            id: 2,
            value: 15
        },
        {
            id: 3,
            value: 20
        },
        {
            id: 3,
            value: 25
        },
        {
            id: 4,
            value: 30
        },
    ]

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Start date"
                    name="start_date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="End date"
                    name="end_date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Discount"
                    name="discount_percent"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select options={discountSelect}/>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
