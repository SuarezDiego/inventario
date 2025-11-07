import './AddItem.css';


export const AddItem: React.FC = () => {
  return (
    <div className="main-container">
      <h2>Agregar un ítem al inventario</h2>
      <form>
        <div className="form-group">
          <label htmlFor="itemCode">Código:</label>
          <input type="text" id="itemCode" name="itemCode" placeholder="ARROZ001" required />
        </div>
        <div className="form-group">
          <label htmlFor="itemName">Nombre:</label>
          <input type="text" id="itemName" name="itemName" placeholder="Arroz" required />
        </div>
        <div className="form-group">
          <label htmlFor="itemDescription">Descripción:</label>
          <textarea id="itemDescription" name="itemDescription" placeholder="Grado largo." rows={4} />
        </div>
        <div className="form-group">
          <label htmlFor="itemImage">URL Imagen:</label>
          <input type="url" id="itemImage" name="itemImage" placeholder="https://www.google.cl/" />
        </div>
        <div className="form-group">
          <label htmlFor="itemShowcase">Cantidad en Vitrina:</label>
          <input type="number" id="itemShowcase" name="itemShowcase" min={0} placeholder="0" required />
        </div>
        <div className="form-group">
          <label htmlFor="itemWarehouse">Cantidad en Bodega:</label>
          <input type="number" id="itemWarehouse" name="itemWarehouse" min={0} placeholder="0" required />
        </div>
        <div className="form-group">
          <label htmlFor="itemSales">Cantidad en Ventas:</label>
          <input type="number" id="itemSales" name="itemSales" min={0} placeholder="0" required />
        </div>
        <div className="form-group">
          <label htmlFor="itemInDelivery">Cantidad en camino:</label>
          <input type="number" id="itemInDelivery" name="itemInDelivery" min={0} placeholder="0" required />
        </div>
        <div className="form-group">
          <button className="buttonSubmit" type="submit">Agregar Ítem</button>
        </div>
      </form>
    </div>
  );
}