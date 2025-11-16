import { useNavigate } from 'react-router-dom';
import './Home.css';

/**
 * Componente Home que muestra opciones principales para navegar a agregar items o inventario.
 * @returns El componente Home con botones de navegación.
 */
export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-header">
        <h1>Bienvenido al Inventario</h1>
        <p>Selecciona una opción para continuar</p>
      </div>

      <div className="home-buttons-container">
        <button
          className="home-button add-item-btn"
          onClick={() => navigate('/add_item')}
          title="Agregar nuevo item"
        >
          <svg
            className="button-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="button-text">Agregar Item</span>
        </button>

        <button
          className="home-button inventory-btn"
          onClick={() => navigate('/inventory')}
          title="Ver inventario"
        >
          <svg
            className="button-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="button-text">Inventario</span>
        </button>
      </div>
    </div>
  );
};