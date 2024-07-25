import React, { useState } from "react";

import { Edit, ListButton, RefreshButton, useForm, useSelect } from "@refinedev/antd";
import { Alert, Button, Form, Input, Select } from "antd";

import { IProduct, ICategory } from "../../interfaces";

export const ProductEdit: React.FC = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);
    const { formProps, saveButtonProps, queryResult } = useForm<IProduct>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "category",
        defaultValue: postData?.category_id,
    });

    const handleRefresh = () => {
        queryResult?.refetch();
        setIsDeprecated(false);
    };

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton />
                        <RefreshButton onClick={handleRefresh} />
                    </>
                ),
            }}
        >
            {isDeprecated && (
                <Alert
                    message="This post is changed. Reload to see it's latest version."
                    type="warning"
                    style={{
                        marginBottom: 20,
                    }}
                    action={
                        <Button onClick={handleRefresh} size="small" type="ghost">
                            Refresh
                        </Button>
                    }
                />
            )}

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
        </Edit>
    );
};
