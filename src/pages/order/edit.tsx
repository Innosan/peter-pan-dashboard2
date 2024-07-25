import React, { useState } from "react";

import { Edit, ListButton, RefreshButton, useForm, useSelect } from "@refinedev/antd";
import { Alert, Button, Form, Select } from "antd";

import { IOrder, IStatus } from "../../interfaces";

export const OrderEdit: React.FC = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);
    const { formProps, saveButtonProps, queryResult } = useForm<IOrder>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps: statusSelect } = useSelect<IStatus>({
        resource: "status",
        defaultValue: postData?.status_id,
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
                    label="Status"
                    name="status_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...statusSelect} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
