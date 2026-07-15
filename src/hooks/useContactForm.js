import { useState } from 'react';
import { apiClient } from '../lib/apiClient';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_REGEX = /^\d{6,12}$/;

const INITIAL_VALUES = {
  nombre: '',
  email: '',
  codigoPais: '+57',
  telefono: '',
  curso: '',
  mensaje: '',
};

function validate(values) {
  const errors = {};

  if (!values.nombre.trim() || values.nombre.trim().length < 2) {
    errors.nombre = 'Ingresa un nombre válido.';
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }
  if (!PHONE_DIGITS_REGEX.test(values.telefono.trim())) {
    errors.telefono = 'Ingresa un teléfono válido (solo números, 6 a 12 dígitos).';
  }
  if (!values.curso) {
    errors.curso = 'Selecciona un curso de interés.';
  }
  if (!values.mensaje.trim() || values.mensaje.trim().length < 10) {
    errors.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  }

  return errors;
}

export default function useContactForm(initialCourse = '') {
  const [values, setValues] = useState({ ...INITIAL_VALUES, curso: initialCourse });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    try {
      const telefono = `${values.codigoPais}${values.telefono.trim()}`;
      await apiClient.post('/contact', { ...values, telefono });
      setStatus('success');
      setValues(INITIAL_VALUES);
    } catch {
      setStatus('error');
    }
  };

  const resetStatus = () => setStatus('idle');

  return { values, errors, status, handleChange, handleSubmit, resetStatus };
}
