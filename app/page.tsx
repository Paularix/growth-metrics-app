import MetricsForm from '@/src/components/features/metrics/metricsForm';

export default function Home() {
  return (
    <main className='min-h-screen p-8 bg-slate-50'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-slate-800'>Growth Metrics Dashboard</h1>

        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-4'>Add data</h2>
          <MetricsForm />
        </section>

      </div>
    </main>
  );
}
