// pages/showSchools.jsx
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schools')
      .then(r => r.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Schools</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ maxWidth: 1100, margin: '30px auto', padding: '0 16px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Schools</h1>
        {loading ? <p>Loading...</p> : (
          <div style={grid}>
            {schools.map(s => (
              <div key={s.id} style={card}>
                <div style={imgWrap}>
                  {s.image ? <img src={s.image} alt={s.name} style={img} /> : <div style={placeholder}>No image</div>}
                </div>
                <div style={cardBody}>
                  <h3 style={{ margin: '6px 0' }}>{s.name}</h3>
                  <p style={{ margin: 0, fontSize: 14 }}>{s.address}</p>
                  <p style={{ margin: '6px 0 0', color: '#555', fontSize: 13 }}>{s.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 16
};
const card = {
  border: '1px solid #eee',
  borderRadius: 8,
  overflow: 'hidden',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};
const imgWrap = { height: 160, width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' };
const img = { width: '100%', height: '100%', objectFit: 'cover' };
const placeholder = { color: '#777' };
const cardBody = { padding: 12, display: 'flex', flexDirection: 'column', flex: 1 };
