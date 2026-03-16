import { BaseShell } from '@/components/shell/BaseShell';
import { ServicesIndex } from '@/components/blocks';
import { Metadata } from 'next';
import config from '@/data/config.json';

export const metadata: Metadata = {
  title: `Our Locksmith Services | Property Security in ${config.location}`,
  description: `Explore our comprehensive range of locksmith services in ${config.location}, including emergency entry, lock replacement, and UPVC door repairs.`,
};

export default function ServicesPage() {
  return (
    <BaseShell>
      <ServicesIndex services={config.services} />
    </BaseShell>
  );
}
