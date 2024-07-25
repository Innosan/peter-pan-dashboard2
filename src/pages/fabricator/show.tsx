import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";

import {
    Show,
    ListButton,
    EditButton,
    RefreshButton,
} from "@refinedev/antd";

import { Typography, Alert, Button } from "antd";

import { IFabricator } from "../../interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const FabricatorShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const { queryResult } = useShow<IFabricator>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const handleRefresh = () => {
        queryResult.refetch();
        setIsDeprecated(false);
    };

    return (
        <Show
            isLoading={isLoading}
            headerProps={{
                extra: (
                    <>
                        <ListButton />
                        <EditButton />
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
                        <Button onClick={handleRefresh} size="small" ghost>
                            Refresh
                        </Button>
                    }
                />
            )}

            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};
