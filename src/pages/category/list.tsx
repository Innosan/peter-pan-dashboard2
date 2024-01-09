import {
    List,
    useTable,
    getDefaultSortOrder, EditButton, ShowButton, FilterDropdown, useSelect,
} from "@refinedev/antd";
import {Select, Space, Table} from "antd";

import { ICategory } from "interfaces";

export const CategoryList: React.FC = () => {
    const { tableProps, sorter } = useTable<ICategory>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        meta: {
            select: "*, parent_id(*)",
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
                <Table.Column
                    key="parent_id"
                    dataIndex={["parent_id", "title"]}
                    title="Parent"
                    defaultSortOrder={getDefaultSortOrder("parent_id.title", sorter)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select parent" {...categorySelect} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<ICategory>
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
