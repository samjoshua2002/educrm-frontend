'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            EduCRM
          </Link>
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className={`font-semibold ${
                pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/leads" 
              className={`font-semibold ${
                pathname === '/leads' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Leads
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}