import './AddItem.css';
import { useState } from 'react';
import { addItem } from '../../helpers/from_api/addItem';
import type { ItemData } from '../../models/ItemData';
import { Snackbar } from '../Snackbar/Snackbar';


export const AddItem: React.FC = () => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    img: '',
    showcase: null,
    warehouse: null,
    sales: null,
    in_delivery: null,
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const showSnackbar = (message: string, type: 'error' | 'success') => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : parseInt(value, 10)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newItem: ItemData = {
        id: 0,
        code: formData.code,
        name: formData.name,
        description: formData.description || undefined,
        img: formData.img || undefined,
        showcase: formData.showcase ?? 0,
        warehouse: formData.warehouse ?? 0,
        sales: formData.sales ?? 0,
        in_delivery: formData.in_delivery ?? 0,
      };

      const result = await addItem(newItem);

      if (result) {
        showSnackbar('¡Ítem agregado correctamente!', 'success');
        setFormData({
          code: '',
          name: '',
          description: '',
          img: '',
          showcase: null,
          warehouse: null,
          sales: null,
          in_delivery: null,
        });
      } else {
        showSnackbar('Error al agregar el ítem', 'error');
      }
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Error desconocido', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h2>Agregar un ítem al inventario</h2>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemCode">Código:</label>
          <input
            type="text"
            id="itemCode"
            name="code"
            placeholder="ARROZ001"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemName">Nombre:</label>
          <input
            type="text"
            id="itemName"
            name="name"
            placeholder="Arroz"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDescription">Descripción:</label>
          <textarea
            id="itemDescription"
            name="description"
            placeholder="Grado largo."
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemImage">URL Imagen:</label>
          <input
            type="url"
            id="itemImage"
            name="img"
            placeholder="https://www.google.cl/"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemShowcase">Cantidad en Vitrina:</label>
          <input
            type="number"
            id="itemShowcase"
            name="showcase"
            min={0}
            placeholder="0"
            value={formData.showcase ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemWarehouse">Cantidad en Bodega:</label>
          <input
            type="number"
            id="itemWarehouse"
            name="warehouse"
            min={0}
            placeholder="0"
            value={formData.warehouse ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemSales">Cantidad en Ventas:</label>
          <input
            type="number"
            id="itemSales"
            name="sales"
            min={0}
            placeholder="0"
            value={formData.sales ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemInDelivery">Cantidad en camino:</label>
          <input
            type="number"
            id="itemInDelivery"
            name="in_delivery"
            min={0}
            placeholder="0"
            value={formData.in_delivery ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button
            className="buttonSubmit"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Agregando...' : 'Agregar Ítem'}
          </button>
        </div>
      </form>
    </div>
  );
}
