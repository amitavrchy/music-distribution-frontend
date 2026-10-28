import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const load = (factory: () => Promise<{ default: ComponentType<any> }>) => {
  const Component = lazy(factory);
  return function LazyPage() {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#05080a]" />}>
        <Component />
      </Suspense>
    );
  };
};

const App = load(() => import("../App"));
const NotFound = load(() => import("../pages/NotFound"));
const Login = load(() => import("@/pages/Login"));
const Signup = load(() => import("@/pages/Signup"));
const Onboarding = load(() => import("@/pages/Onboarding"));
const AdminDashboardPage = load(() => import("@/pages/Admin/AdminDashboardPage"));
const AdminLayout = load(() => import("@/Layout/AdminLayout"));
const ClientLayout = load(() => import("@/Layout/ClientLayout"));
const ClientDashboardPage = load(() => import("@/pages/Client/ClientDashboardPage"));
const ClientAnalyticsPage = load(() => import("@/pages/Client/ClientAnalyticsPage"));
const AnalyticsYoutubePage = load(() => import("@/pages/Client/AnalyticsYoutubePage"));
const StatementPage = load(() => import("@/pages/Client/StatementPage"));
const ProfitLossPage = load(() => import("@/pages/Client/ProfitLossPage"));
const ReleasesPage = load(() => import("@/pages/Client/ReleasesPage"));
const SubmitPage = load(() => import("@/pages/Client/SubmitPage"));
const BackCatalogPage = load(() => import("@/pages/Client/BackCatalogPage"));
const ReleasesDetails = load(
  () => import("@/components/ClientDashboard/Catalog/Releases/ReleasesDetails"),
);
const SettingsPage = load(() => import("@/pages/Client/SettingsPage"));
const SplitSheetsPage = load(() => import("@/pages/Client/SplitSheetsPage"));
const SpotifyPage = load(() => import("@/pages/Client/SpotifyPage"));
const AppleMusicPage = load(() => import("@/pages/Client/AppleMusicPage"));
const SoundCloudPage = load(() => import("@/pages/Client/SoundCloudPage"));
const StapeComponent = load(
  () => import("@/components/ClientDashboard/Catalog/Submit/StapeComponent"),
);
const DistributorLayout = load(() => import("@/Layout/DistributorLayout"));
const DistributorDashboardPage = load(
  () => import("@/pages/Distributor/DistributorDashboardPage"),
);
const AccountantLayout = load(() => import("@/Layout/AccountantLayout"));
const AccountantDashboardPage = load(
  () => import("@/pages/Accountant/AccountantDashboardPage"),
);
const DistributorSubmissions = load(
  () => import("@/pages/Distributor/DistributorSubmissions"),
);
const StatementDetailsPage = load(() => import("@/pages/Client/StatementDetailsPage"));
const DistributorBackCatalog = load(
  () => import("@/pages/Distributor/DistributorBackCatalog"),
);
const TIDALPage = load(() => import("@/pages/Client/TIDALPage"));
const AudiomackPage = load(() => import("@/pages/Client/AudiomackPage"));
const DeezerPage = load(() => import("@/pages/Client/DeezerPage"));
const AdminStatementPage = load(() => import("@/pages/Admin/AdminStatementPage"));
const AdminProfitLossPage = load(() => import("@/pages/Admin/AdminProfitLossPage"));
const DataEntryForm = load(
  () => import("@/components/ClientDashboard/Catalog/BackCatalog/DataEntryForm"),
);
const CatalogDetailsData = load(
  () => import("@/components/ClientDashboard/Catalog/BackCatalog/CatalogDetailsData"),
);
const AdminRealisePage = load(() => import("@/pages/Admin/AdminRealisePage"));
const AdminRealiseDetailsPage = load(
  () => import("@/pages/Admin/AdminRealiseDetailsPage"),
);
const AdminBackCatalogPage = load(() => import("@/pages/Admin/AdminBackCatalogPage"));
const AdminSubmitPage = load(() => import("@/pages/Admin/AdminSubmitPage"));
const AdminTeamPage = load(() => import("@/pages/Admin/AdminTeamPage"));
const SubmitDetails = load(
  () => import("@/components/AdminDashboard/AdminCatalog/Submit/SubmitDetails"),
);
const ClientsManagementPage = load(
  () => import("@/pages/Distributor/ClientsManagementPage"),
);
const CreateNewClient = load(
  () => import("@/components/DistributorDashboard/Client/CreateNewClient"),
);
const SubmissionDetails = load(
  () => import("@/components/DistributorDashboard/DistributorSubmision/SubmissionDetails"),
);
const DistributionPage = load(() => import("@/pages/Distributor/DistributionPage"));
const DistributationDetails = load(
  () => import("@/components/DistributorDashboard/Distribution/DistributationDetails"),
);
const PaymentsEarningsPage = load(
  () => import("@/pages/Accountant/PaymentsEarningsPage"),
);
const ProfitLossPages = load(() => import("@/pages/Accountant/ProfitLossPages"));
const StatementsPage = load(() => import("@/pages/Accountant/StatementsPage"));
const ClientManagementPage = load(
  () => import("@/pages/Accountant/ClientManagementPage"),
);
const IHeartRadioPage = load(() => import("@/pages/Client/IHeartRadioPage"));
const AccountanSettingsPage = load(
  () => import("@/pages/Accountant/AccountanSettingsPage"),
);
const DistributorSettingPage = load(
  () => import("@/pages/Distributor/DistributorSettingPage"),
);
const SplitSheetDetail = load(
  () => import("@/components/ClientDashboard/Catalog/SplitSheets/SplitSheetDetail"),
);
const EditorialSupportPage = load(() => import("@/pages/Client/EditorialSupportPage"));
const EditorialStapeComponent = load(
  () => import("@/components/ClientDashboard/EditorialSupport/EditorialStapeComponent"),
);
const EditorialPitchForm = load(
  () => import("@/components/ClientDashboard/EditorialSupport/EditorialPitchForm"),
);
const LabelBridge = load(() => import("@/components/LabelBridge/LabelBridge"));
const NewsArticlesPage = load(() => import("@/pages/Home/NewsArticlesPage"));
const AboutPage = load(() => import("@/pages/Home/AboutPage"));
const Shop = load(() => import("@/components/Home/Shop/Shop"));
const ProductDetailPage = load(
  () => import("@/components/Home/Shop/ProductDetailPage"),
);
const CheckoutPage = load(() => import("@/components/Home/Shop/Checkout/CheckoutPage"));
const OrdersPage = load(() => import("@/components/Home/Shop/Orders/OrdersPage"));
const OrderDetailsPage = load(
  () => import("@/components/Home/Shop/Orders/OrderDetailsPage"),
);
const PrivacyPolicy = load(() => import("@/PrivacyPolicy/PrivacyPolicy"));
const TermsConditions = load(() => import("@/PrivacyPolicy/TermsConditions"));
const Home = load(() => import("@/components/Home/Home"));
const Unauthorized = load(() => import("@/pages/Unauthorized"));
const ClientAdminLayout = load(() => import("@/Layout/ClientAdminLayout"));
const ClientAdminDashboard = load(
  () => import("@/pages/ClientAdmin/ClientAdminDashboard"),
);
const ForgotPassword = load(() => import("@/pages/ForgotPassword"));
const ResetPassword = load(() => import("@/pages/ResetPassword"));
const ClientSubmit = load(
  () => import("@/components/ClientDashboard/Catalog/Submit/ClientSubmit"),
);
const AdminShopPage = load(() => import("@/pages/Admin/AdminShopPage"));
const AdminOrderPage = load(() => import("@/pages/Admin/AdminOrderPage"));
const AdminOrderDetailPage = load(() => import("@/pages/Admin/AdminOrderDetailPage"));
const AdminCouponPage = load(() => import("@/pages/Admin/AdminCouponPage"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/labelbridge",
        element: <LabelBridge />,
      },

      {
        path: "/news-articles",
        element: <NewsArticlesPage />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/cart",
        element: <ProductDetailPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailsPage />,
      },

      {
        path: "/details/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  /* Client Dashboard */
  {
    path: "/client-dashboard",
    element: (
      <PrivateRoute allowedRoles={["CLIENT"]}>
        <ClientLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <ClientDashboardPage /> },
      { path: "dashboard", element: <ClientDashboardPage /> },
      { path: "analytics", element: <ClientAnalyticsPage /> },
      /* Analytics*/
      { path: "analytics/YouTube", element: <AnalyticsYoutubePage /> },
      { path: "analytics/Spotify", element: <SpotifyPage /> },
      { path: "analytics/AppleMusic", element: <AppleMusicPage /> },
      { path: "analytics/SoundCloud", element: <SoundCloudPage /> },
      { path: "analytics/Audiomack", element: <AudiomackPage /> },
      { path: "analytics/Deezer", element: <DeezerPage /> },
      { path: "analytics/TIDAL", element: <TIDALPage /> },
      { path: "analytics/iHeartRadio", element: <IHeartRadioPage /> },
      /* Accounting */
      { path: "accounting/statement", element: <StatementPage /> },
      { path: "accounting/statement/:id", element: <StatementDetailsPage /> },
      { path: "accounting/profit-loss", element: <ProfitLossPage /> },
      /*  Catalog*/
      { path: "catalog/releases", element: <ReleasesPage /> },
      { path: "catalog/releases/:id", element: <ReleasesDetails /> },
      { path: "catalog/submit", element: <SubmitPage /> },
      { path: "catalog/submit/form", element: <StapeComponent /> },

      { path: "catalog/back-catalog", element: <BackCatalogPage /> },
      { path: "catalog/back-catalog/add", element: <DataEntryForm /> },
      { path: "catalog/back-catalog/edit/:id", element: <DataEntryForm /> },
      {
        path: "catalog/back-catalog/view/:id",
        element: <CatalogDetailsData />,
      },
      { path: "catalog/split-sheets", element: <SplitSheetsPage /> },
      { path: "catalog/split-sheet/:id", element: <SplitSheetDetail /> },

      /* Editorial Support */
      { path: "catalog/editorial-submit", element: <EditorialSupportPage /> },
      { path: "editorial-submit/:title", element: <EditorialPitchForm /> },
      /*  */
      {
        path: "catalog/editorial-submit/form",
        element: <EditorialStapeComponent />,
      },

      /* profile */
      { path: "catalog/settings", element: <SettingsPage /> },
    ],
  },

  /* Distributor Dashboard */
  {
    path: "/distributor-dashboard",
    element: (
      <PrivateRoute allowedRoles={["DISTRIBUTOR"]}>
        <DistributorLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DistributorDashboardPage /> },
      { path: "dashboard", element: <DistributorDashboardPage /> },
      { path: "submissions", element: <DistributorSubmissions /> },
      { path: "submissions/:id", element: <SubmissionDetails /> },
      { path: "back-catalog", element: <DistributorBackCatalog /> },
      { path: "back-catalog/view/:id", element: <CatalogDetailsData /> },
      /*  */
      { path: "distribution", element: <DistributionPage /> },
      {
        path: "distribution/details/:releaseId",
        element: <DistributationDetails />,
      },
      // {
      //   path: "distribution/confirm-distribution",
      //   element: <ConfirmDistribution />,
      // },

      { path: "client", element: <ClientsManagementPage /> },
      { path: "client/create", element: <CreateNewClient /> },

      { path: "settings", element: <DistributorSettingPage /> },
    ],
  },

  /* Accountant Dashboard */
  {
    path: "/accountant-dashboard",
    element: (
      <PrivateRoute allowedRoles={["ACCOUNTANT"]}>
        <AccountantLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AccountantDashboardPage /> },
      { path: "dashboard", element: <AccountantDashboardPage /> },
      { path: "payments-earnings", element: <PaymentsEarningsPage /> },
      { path: "statements", element: <StatementsPage /> },
      { path: "profit-loss", element: <ProfitLossPages /> },
      { path: "client-manage", element: <ClientManagementPage /> },
      { path: "settings", element: <AccountanSettingsPage /> },
    ],
  },

  /* Super Admin Dashboard */
  {
    path: "/super-admin-dashboard",
    element: (
      <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "statement", element: <AdminStatementPage /> },
      { path: "profit-loss", element: <AdminProfitLossPage /> },
      /* Catalog */
      { path: "releases", element: <AdminRealisePage /> },
      { path: "releases/:id", element: <AdminRealiseDetailsPage /> },
      { path: "back-catalog", element: <AdminBackCatalogPage /> },
      { path: "back-catalog/view/:id", element: <CatalogDetailsData /> },
      { path: "submit", element: <AdminSubmitPage /> },
      { path: "submit/:id", element: <SubmitDetails /> },
      /* team */
      { path: "team", element: <AdminTeamPage /> },
      /* shop */
      { path: "shop", element: <AdminShopPage /> },
      /* orders */
      { path: "orders", element: <AdminOrderPage /> },
      { path: "orders/:orderId", element: <AdminOrderDetailPage /> },
      /* coupons */
      { path: "coupons", element: <AdminCouponPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  // admin
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <ClientAdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <ClientAdminDashboard /> },
      { path: "dashboard", element: <ClientAdminDashboard /> },
      { path: "analytics", element: <ClientAnalyticsPage /> },
      /* Analytics*/
      { path: "analytics/youtube", element: <AnalyticsYoutubePage /> },
      { path: "analytics/spotify", element: <SpotifyPage /> },
      { path: "analytics/apple-music", element: <AppleMusicPage /> },
      { path: "analytics/sound-cloud", element: <SoundCloudPage /> },
      { path: "analytics/audiomack", element: <AudiomackPage /> },
      { path: "analytics/deezer", element: <DeezerPage /> },
      { path: "analytics/tidal", element: <TIDALPage /> },
      { path: "analytics/iheart-radio", element: <IHeartRadioPage /> },
      /* Accounting */
      { path: "accounting/statement", element: <StatementPage /> },
      { path: "accounting/statement/:id", element: <StatementDetailsPage /> },
      { path: "accounting/profit-loss", element: <ProfitLossPage /> },
      /*  Catalog*/
      { path: "catalog/releases", element: <ReleasesPage /> },
      { path: "catalog/releases/:id", element: <AdminRealiseDetailsPage /> },
      { path: "catalog/submit", element: <ClientSubmit /> },
      { path: "catalog/submit/:id", element: <SubmissionDetails /> },

      { path: "catalog/back-catalog", element: <BackCatalogPage /> },
      { path: "catalog/back-catalog/edit", element: <DataEntryForm /> },
      {
        path: "catalog/back-catalog/view/:id",
        element: <CatalogDetailsData />,
      },
      { path: "catalog/back-catalog/edit/:id", element: <DataEntryForm /> },
      { path: "catalog/back-catalog/add", element: <DataEntryForm /> },
      { path: "catalog/split-sheets", element: <SplitSheetsPage /> },
      { path: "catalog/split-sheet/:id", element: <SplitSheetDetail /> },

      /* Editorial Support */
      { path: "catalog/editorial-submit", element: <EditorialSupportPage /> },
      { path: "editorial-submit/:title", element: <EditorialPitchForm /> },
      {
        path: "catalog/editorial-submit/form",
        element: <EditorialStapeComponent />,
      },
      /* profile */
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
