import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('Form', () => {
  test('renders form fields', () => {
    render(<Form />);
    expect(screen.getByPlaceholderText('Edad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Deuda Crediticia')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Historial de Pago')).toBeInTheDocument();
  });

  test('updates form data on input change', () => {
    render(<Form />);
    const edadInput = screen.getByPlaceholderText('Edad');
    fireEvent.change(edadInput, { target: { value: '30' } });
    expect(edadInput.value).toBe('30');
  });

  test('submits form data and plays audio on form submission', async () => {
    render(<Form />);
    const edadInput = screen.getByPlaceholderText('Edad');
    const ingresosInput = screen.getByPlaceholderText('Ingresos');
    const deudaInput = screen.getByPlaceholderText('Deuda Crediticia');
    const historialInput = screen.getByPlaceholderText('Historial de Pago');
    const submitButton = screen.getByText('Enviar');

    fireEvent.change(edadInput, { target: { value: '30' } });
    fireEvent.change(ingresosInput, { target: { value: '50000' } });
    fireEvent.change(deudaInput, { target: { value: '20000' } });
    fireEvent.change(historialInput, { target: { value: '3' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Segmento: Alto')).toBeInTheDocument();
    });

    // TODO: Add assertions for audio playback
  });
});