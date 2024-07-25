import {
    List,
    useTable,
    getDefaultSortOrder, EditButton, ShowButton,
} from "@refinedev/antd";
import {Space, Table} from "antd";

import { IFabricator } from "../../interfaces";

export const FabricatorList: React.FC = () => {
    const { tableProps, sorter } = useTable<IFabricator>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter defaultSortOrder={getDefaultSortOrder("id", sorter)} />
                <Table.Column key="title" dataIndex="title" title="Title" sorter />
                <Table.Column<IFabricator>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <ShowButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />

            </Table>
        </List>
    );
};
