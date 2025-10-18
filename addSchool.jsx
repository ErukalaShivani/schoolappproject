// pages/addSchool.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Head from 'next/head';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      const form = new FormData();
      form.append('name', data.name);
      form.append('address', data.address);
      form.append('city', data.city);
      form.append('state', data.state);
      form.append('contact', data.contact);
      form.append('email_id', data.email_id);
      if (data.image[0]) form.append('image', data.image[0]);

      const res = await fetch('/api/schools', {
        method: 'POST',
        body: form
      });

      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        const err = await res.json();
        setStatus(err.error || 'error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Add School</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.page}>
        <h1 style={styles.title}>Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} encType="multipart/form-data">
          <label style={styles.label}>
            Name
            <input style={styles.input} {...register('name', { required: 'Name is required' })} />
            {errors.name && <small style={styles.err}>{errors.name.message}</small>}
          </label>

          <label style={styles.label}>
            Address
            <textarea style={styles.textarea} {...register('address', { required: 'Address required' })} />
            {errors.address && <small style={styles.err}>{errors.address.message}</small>}
          </label>

          <div style={styles.row}>
            <label style={{...styles.label, ...styles.col}}>
              City
              <input style={styles.input} {...register('city', { required: 'City required' })} />
              {errors.city && <small style={styles.err}>{errors.city.message}</small>}
            </label>

            <label style={{...styles.label, ...styles.col}}>
              State
              <input style={styles.input} {...register('state', { required: 'State required' })} />
              {errors.state && <small style={styles.err}>{errors.state.message}</small>}
            </label>
          </div>

          <div style={styles.row}>
            <label style={{...styles.label, ...styles.col}}>
              Contact
              <input style={styles.input} {...register('contact', { required: 'Contact required', pattern: { value: /^[0-9+\-\s]{7,20}$/, message: 'Invalid contact' } })} />
              {errors.contact && <small style={styles.err}>{errors.contact.message}</small>}
            </label>

            <label style={{...styles.label, ...styles.col}}>
              Email
              <input style={styles.input} {...register('email_id', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} />
              {errors.email_id && <small style={styles.err}>{errors.email_id.message}</small>}
            </label>
          </div>

          <label style={styles.label}>
            Image (optional)
            <input type="file" accept="image/*" {...register('image')} />
          </label>

          <button type="submit" style={styles.button}>
            {status === 'loading' ? 'Saving...' : 'Add School'}
          </button>

          {status === 'success' && <p style={styles.success}>School added successfully!</p>}
          {status && status !== 'loading' && status !== 'success' && <p style={styles.err}>Error: {String(status)}</p>}
        </form>
      </main>
    </>
  );
}

const styles = {
  page: { maxWidth: 900, margin: '40px auto', padding: '0 16px' },
  title: { textAlign: 'center', marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { display: 'flex', flexDirection: 'column', fontSize: 14 },
  input: { padding: '8px 10px', fontSize: 14, borderRadius: 6, border: '1px solid #ccc' },
  textarea: { padding: '8px 10px', minHeight: 80, borderRadius: 6, border: '1px solid #ccc' },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  col: { flex: 1, minWidth: 200 },
  button: { padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: '#0070f3', color: '#fff', marginTop: 8 },
  err: { color: '#b00020', marginTop: 6 },
  success: { color: 'green', marginTop: 8 }
};
