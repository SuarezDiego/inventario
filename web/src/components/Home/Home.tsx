import './Home.css';

/**
 * Componente Home que muestra un mensaje de bienvenida y una breve descripción.
 * @returns El componente Home que muestra un mensaje de bienvenida y una breve descripción.
 */
export const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Bienvenido al Inventario</h1>
            <p>Aquí puedes gestionar tus productos de manera eficiente.</p>
        </div>
    );
};