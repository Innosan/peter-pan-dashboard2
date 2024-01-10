import { useList } from "@refinedev/core";

import {Card, Statistic, Flex, Space} from 'antd';
import { DotChartOutlined } from "@ant-design/icons";
import {ProductList} from "./product";

export const Index: React.FC = () => {
    const { data: products} = useList({
        resource: "product",
        pagination: {
            mode: "off"
        }
    });

    const { data: categories} = useList({
        resource: "category",
        pagination: {
            mode: "off"
        }
    });

    const { data: fabricators} = useList({
        resource: "fabricator",
        pagination: {
            mode: "off"
        }
    });

    return (
        <Space direction={"vertical"}>
            <Card title={
                <Flex align="center" gap="small">
                    <DotChartOutlined />
                    <span>Главное</span>
                </Flex>
            }>
                <Flex gap="large">
                    <Statistic title="Продукты" value={products?.data.length} />
                    <Statistic title="Категории" value={categories?.data.length} />
                    <Statistic title="Производители" value={fabricators?.data.length} />
                </Flex>
            </Card>
        </Space>

    );
};
