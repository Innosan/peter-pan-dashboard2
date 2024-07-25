import {
    Refine,
    Authenticated,
} from "@refinedev/core";

import {
    notificationProvider,
    ErrorComponent,
    AuthPage,
} from "@refinedev/antd";

/**
 * Supabase
 */
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";
import authProvider from "./authProvider";

/**
 * Routing
 */
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

/**
 * Theming
 */
import { ThemedLayoutV2, RefineThemes } from "@refinedev/mui";
import {FireOutlined, ContainerOutlined, TagsOutlined, ShoppingCartOutlined, BankOutlined} from '@ant-design/icons';
import { ThemeProvider } from "@mui/material/styles";
import "@refinedev/antd/dist/reset.css";

/**
 * Pages
 */
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/product";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/category";
import { HotDealCreate, HotDealEdit, HotDealList, HotDealShow } from "./pages/hot_deal";
import {Index} from "./pages";
import {OrderEdit, OrderList, OrderShow} from "./pages/order";
import {FabricatorCreate, FabricatorEdit, FabricatorList, FabricatorShow} from "./pages/fabricator";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(supabaseClient)}
                    liveProvider={liveProvider(supabaseClient)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "product",
                            list: "/product",
                            create: "/product/create",
                            edit: "/product/edit/:id",
                            show: "/product/show/:id",
                            meta: {
                                canDelete: true,
                                icon: <ContainerOutlined />,
                                label: "Продукты"
                            },
                        },
                        {
                            name: "order",
                            list: "/order",
                            show: "/order/show/:id",
                            edit: "/order/edit/:id",
                            meta: {
                                canDelete: true,
                                icon: <ShoppingCartOutlined />,
                                label: "Заказы"
                            },
                        },
                        {
                            name: "category",
                            list: "/category",
                            create: "/category/create",
                            edit: "/category/edit/:id",
                            show: "/category/show/:id",
                            meta: {
                                canDelete: true,
                                icon: <TagsOutlined />,
                                label: "Категории"
                            },
                        },
                        {
                            name: "fabricator",
                            list: "/fabricator",
                            create: "/fabricator/create",
                            edit: "/fabricator/edit/:id",
                            show: "/fabricator/show/:id",
                            meta: {
                                canDelete: true,
                                icon: <BankOutlined />,
                                label: "Производители"
                            },
                        },
                        {
                            name: "hot_deal",
                            list: "/hot_deal",
                            create: "/hot_deal/create",
                            edit: "/hot_deal/edit/:id",
                            show: "/hot_deal/show/:id",
                            meta: {
                                canDelete: true,
                                icon: <FireOutlined />,
                                label: "Скидки"
                            },
                        },
                    ]}
                    notificationProvider={notificationProvider}
                    /**
                     * Multiple subscriptions are currently not supported with the supabase JS client v2 and @refinedev/supabase v4.
                     * Therefore, enabling global live mode will cause unexpected behaviors.
                     * Please set `liveMode: "auto"` or `liveMode: "manual"` manually while using real-time features of refine.
                     */
                    options={{
                        liveMode: "off",
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    key="authenticated-routes"
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <Index/>
                                }
                            />

                            <Route path="/product">
                                <Route index element={<ProductList />} />
                                <Route path="create" element={<ProductCreate />} />
                                <Route path="edit/:id" element={<ProductEdit />} />
                                <Route path="show/:id" element={<ProductShow />} />
                            </Route>
                            <Route path="/order">
                                <Route index element={<OrderList />} />
                                <Route path="show/:id" element={<OrderShow />} />
                                <Route path="edit/:id" element={<OrderEdit />} />
                            </Route>
                            <Route path="/category">
                                <Route index element={<CategoryList />} />
                                <Route path="create" element={<CategoryCreate />} />
                                <Route path="edit/:id" element={<CategoryEdit />} />
                                <Route path="show/:id" element={<CategoryShow />} />
                            </Route>
                            <Route path="/fabricator">
                                <Route index element={<FabricatorList />} />
                                <Route path="create" element={<FabricatorCreate />} />
                                <Route path="edit/:id" element={<FabricatorEdit />} />
                                <Route path="show/:id" element={<FabricatorShow />} />
                            </Route>
                            <Route path="/hot_deal">
                                <Route index element={<HotDealList />} />
                                <Route path="create" element={<HotDealCreate />} />
                                <Route path="edit/:id" element={<HotDealEdit />} />
                                <Route path="show/:id" element={<HotDealShow />} />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated
                                    key="auth-pages"
                                    fallback={<Outlet />}
                                >
                                    <NavigateToResource resource="product" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        formProps={{
                                            initialValues: {
                                                email: "info@refine.dev",
                                                password: "refine-supabase",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated key="catch-all">
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
