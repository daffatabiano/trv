import AdminLayout from '@/layout/AdminLayout';
import Dashboard from '@/views/DashboardViews';

export default function Page() {
    return (
        <AdminLayout>
            <Dashboard />;
        </AdminLayout>
    )
}
