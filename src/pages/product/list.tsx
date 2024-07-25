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

import { IProduct, ICategory, IFabricator } from "interfaces";
import {useLink} from "@refinedev/core";

export const ProductList: React.FC = () => {
    const Link = useLink();

    const { tableProps, sorter } = useTable<IProduct>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
        meta: {
            select: "*, category_id(*), fabricator_id(*)",
        },
    });

    const { selectProps: categorySelect } = useSelect<ICategory>({
        resource: "category",
    });

    const { selectProps: fabricatorSelect } = useSelect<IFabricator>({
        resource: "fabricator",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" sorter defaultSortOrder={getDefaultSortOrder("id", sorter)} />
                <Table.Column key="title" dataIndex="title" title="Title" sorter />
                <Table.Column key="price" dataIndex="price" title="Price" sorter />
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
                <Table.Column key="weight" dataIndex="weight" title="Weight" sorter />
                <Table.Column key="quantity" dataIndex="quantity" title="Quantity" sorter />
                <Table.Column
                    key="fabricator_id"
                    render={((value, record, index) => {
                        return (
                            <Link to={"/fabricator/show/" + record.fabricator_id.id}>
                                {
                                value
                                }
                            </Link>
                        )
                    })}
                    dataIndex={["fabricator_id", "title"]}
                    title="Fabricator"
                    defaultSortOrder={getDefaultSortOrder("fabricator_id.title", sorter)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select fabricator" {...fabricatorSelect} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IProduct>
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
