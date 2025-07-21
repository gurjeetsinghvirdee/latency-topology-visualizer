import Head from 'next/head';
import Map3DWrapper from '../src/components/Map3DWrapper';

export default function Home() {
  return (
    <>
      <Head>
        <title>Latency Topology Visualizer</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <main style={{ 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Map3DWrapper />
      </main>
    </>
  );
}