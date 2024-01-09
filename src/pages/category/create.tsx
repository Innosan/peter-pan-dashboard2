import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { ICategory } from "interfaces";

export const CategoryCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "category",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
