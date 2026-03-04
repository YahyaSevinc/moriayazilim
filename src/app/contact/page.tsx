import { Suspense } from 'react';
import ContactComponent from '@/app/components/contact/contact';

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <ContactComponent/>
    </Suspense>
  );
}
