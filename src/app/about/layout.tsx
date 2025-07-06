import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full pt-12">
      <Header />
      {children}
      <Footer />
    </div>
  );
}