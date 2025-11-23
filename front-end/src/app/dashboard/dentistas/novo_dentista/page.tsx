'use client';

import { useRouter } from 'next/navigation';
import {DentistaFormCreate} from "@/app/dashboard/dentistas/_components/DentistaFormCreate";


export default function NovoDentistaPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/dashboard/dentistas');
    };

    const handleCancel = () => {
        router.push('/dashboard/dentistas');
    };

    return (
        <div className="novo-dentista-page">
            <div className="page-container">
                <DentistaFormCreate
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>

            <style jsx>{`
        .novo-dentista-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .page-container {
          max-width: 500px;
          margin: 0 auto;
        }
      `}</style>
        </div>
    );
}