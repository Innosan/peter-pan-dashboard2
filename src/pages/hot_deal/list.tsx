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

import { IHotDeal, ICategory } from "../../interfaces";

export const HotDealList: React.FC = () => {
    const { tableProps, sorter } = useTable<IHotDeal>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        meta: {
            select: "*, category_id(*)",
        },
    });

    const { selectProps: categorySelect } = useSelect<ICategory>({
        resource: "category",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter defaultSortOrder={getDefaultSortOrder("id", sorter)} />
                <Table.Column key="title" dataIndex="title" title="Title" sorter />
                <Table.Column key="description" dataIndex="description" title="Description" sorter />
                <Table.Column
                    key="category_id"
                    dataIndex={["category_id", "title"]}
                    title="Category"
                    defaultSortOrder={getDefaultSortOrder("category_id.title", sorter)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select Category" {...categorySelect} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column key="start_date" dataIndex="start_date" title="start_date" sorter />
                <Table.Column key="end_date" dataIndex="end_date" title="end_date" sorter />
                <Table.Column<IHotDeal>
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
