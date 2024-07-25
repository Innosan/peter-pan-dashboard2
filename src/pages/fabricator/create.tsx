import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

import { IFabricator } from "../../interfaces";

export const FabricatorCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IFabricator>();

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
            </Form>
        </Create>
    );
};
