import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";

import {
    Show,
    ListButton,
    EditButton,
    RefreshButton,
} from "@refinedev/antd";

import { List } from 'antd';

import {Typography, Alert, Button} from "antd";

import { IOrder, IUser} from "../../interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const { queryResult } = useShow<IOrder>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
        meta: {
            select: "*, order_item(*, product_id(*)), status_id(*)",
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: userData, isLoading: userIsLoading } =
        useOne<IUser>({
            resource: "user",
            id: record?.user_id || "",
            queryOptions: {
                enabled: !!record,
            },
        });

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

            <Title level={5}>Address</Title>
            <Text>{record?.delivery_address}</Text>

            <Title level={5}>User</Title>
            <Text>
                {userIsLoading ? "Loading..." : userData?.data.first_name + ' ' + userData?.data.last_name}
            </Text>

            <p></p>

            <List
                header={<h2>Заказанные продукты</h2>}
                bordered
                dataSource={record?.order_item}
                renderItem={(item) => (
                    <List.Item>
                        <p>{item.product_id.title}</p>
                    </List.Item>
                )}
            />



        </Show>
    );
};
