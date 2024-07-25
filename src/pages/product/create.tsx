import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { IProduct, ICategory } from "../../interfaces";

export const ProductCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IProduct>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "category",
    });

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
