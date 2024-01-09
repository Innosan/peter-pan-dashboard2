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
import {ThemeProvider} from "@mui/material/styles";
import "@refinedev/antd/dist/reset.css";

/**
 * Pages
 */
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/product";
import {CategoryCreate, CategoryEdit, CategoryList, CategoryShow} from "./pages/category";

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
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="/product">
                                <Route index element={<ProductList />} />
                                <Route path="create" element={<ProductCreate />} />
                                <Route path="edit/:id" element={<ProductEdit />} />
                                <Route path="show/:id" element={<ProductShow />} />
                            </Route>
                            <Route path="/category">
                                <Route index element={<CategoryList />} />
                                <Route path="create" element={<CategoryCreate />} />
                                <Route path="edit/:id" element={<CategoryEdit />} />
                                <Route path="show/:id" element={<CategoryShow />} />
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