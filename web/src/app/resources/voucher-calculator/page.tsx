import VoucherCalculator from '@/components/VoucherCalculator';

export default function VoucherCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <VoucherCalculator />
    </main>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Section 8 Voucher Affordability Calculator | Properties 4 Creation',
  description: 'Calculate how affordable veteran housing can be with Section 8 vouchers. See your potential monthly costs and savings with our interactive calculator.',
  keywords: 'Section 8 calculator, voucher affordability, veteran housing costs, section 8 rent calculator',
  openGraph: {
    title: 'Section 8 Voucher Affordability Calculator',
    description: 'Calculate how affordable veteran housing can be with Section 8 vouchers. Interactive calculator shows your potential monthly costs.',
    type: 'website',
  },
};
