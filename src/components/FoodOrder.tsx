import { MouseEventHandler, useContext, useState } from "react";
import { MenuItem } from "../entities/MenuItem";
import { foodItemsContext } from "./MainComponent";
import { useDispatch } from "react-redux";
import { decrementQuantity } from "../slices/MenuItemSlice";
import '../styles/foodOrder.css'

interface FoodOrderProps {
  food: MenuItem;
  onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {

  // const [totalAmount, setTotalAmount] = useState(props.food.price); // precio unitario * cantidad
  const [quantity, setQuantity] = useState(1); // Estado para guardar la cantidad ingresada
  const [isOrdered, setIsOrdered] = useState(false); // si está pedido
  const menuItems: MenuItem[] = useContext(foodItemsContext);

  const dispatch = useDispatch();

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    setIsOrdered(true);
    menuItems.map((item: MenuItem) => {
      if (item.id === props.food.id) {
        dispatch(decrementQuantity({ id: props.food.id, quantity }));
      }
    });
  };

  return (
    <>
      <img src={"/images/" + props.food.image} alt={props.food.name} />
      <h3>{props.food.name}</h3>
      <p>{props.food.desc}</p>
      <p>{props.food.price}$</p>
      <form className="foodOrderForm" onSubmit={handleClick}>
        <h3>Ordena tu comida</h3>

        <div className="formGroup">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={props.food.quantity} // Limita el máximo a la cantidad disponible
            placeholder="Ej. 2"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Tu nombre" />
        </div>

        <div className="formGroup">
          <label htmlFor="phone">Teléfono</label>
          <input type="tel" id="phone" name="phone" placeholder="+34 123 456 789" />
        </div>

        <div className="buttonGroup">
          <button type="submit" className="orderButton">Hacer Pedido</button>
          <button className="orderButton" onClick={props.onReturnToMenu}>Volver</button>
        </div>
      </form>
      {isOrdered && (
        <div className="successMessage">
          <p>Tu pedido ha sido realizado con éxito!</p>
          <p>Recibirás una notificación cuando llegue.</p>
        </div>
      )}
    </>
  );
}

export default FoodOrder;













