import {
    List,
    useTable,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    FilterDropdown,
    useSelect,
} from "@refinedev/antd";
import { Table, Space, Select } from "antd";

import { IOrder, IUser, IStatus } from "../../interfaces";

export const OrderList: React.FC = () => {
    const { tableProps, sorter } = useTable<IOrder>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        meta: {
            select: "*, order_item(*, product_id(*)), user_id(*), status_id(*)",
        },
    });

    const { selectProps: statusSelect } = useSelect<IStatus>({
        resource: "status",
    });

    const { selectProps: userSelect } = useSelect<IUser>({
        resource: "user",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter defaultSortOrder={getDefaultSortOrder("id", sorter)} />
                <Table.Column key="delivery_address" dataIndex="delivery_address" title="delivery_address" sorter />
                <Table.Column key="total" dataIndex="total" title="total" sorter />
                <Table.Column key="order_date" dataIndex="order_date" title="order_date" sorter />
                <Table.Column
                    key="user_id"
                    dataIndex={["user_id", "first_name"]}
                    title="User"
                    defaultSortOrder={getDefaultSortOrder("user_id.first_name", sorter)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select user" {...userSelect} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="status_id"
                    dataIndex={["status_id", "title"]}
                    title="Status"
                    defaultSortOrder={getDefaultSortOrder("status_id.title", sorter)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select status" {...statusSelect} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IOrder>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
