import React, { useState } from "react";

import { Edit, ListButton, RefreshButton, useForm } from "@refinedev/antd";
import { Alert, Button, Form, Input } from "antd";

import { ICategory } from "../../interfaces";

export const CategoryEdit: React.FC = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);
    const { formProps, saveButtonProps, queryResult } = useForm<ICategory>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
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
            </Form>
        </Edit>
    );
};
