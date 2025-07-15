import React, { Suspense, useState, createContext, useContext } from "react";

import { MenuItem } from "../entities/MenuItem";
import FoodOrder from "../components/FoodOrder";

// Obtén el estado de autenticación y rol
import { AuthContext } from "../context/AuthContext";
import { Role } from "../services/IAuthService";

const Foods = React.lazy(() => import("../components/Foods")); // Lazy load
export const foodItemsContext = createContext<MenuItem[]>([]); // Contexto para pasar los items de comida

const MainComponent: React.FC = () => {
    const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
    const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);

    const { roles, isAuthenticated } = useContext(AuthContext);
    const [menuItems] = useState<MenuItem[]>([
        {
            id: 1,
            name: "Hamburguesa de Pollo",
            quantity: 40,
            desc: "Esto es una haburguesa de pollo",
            price: 12,
            image: "hamburguesa.jpg",
        },
        {
            id: 2,
            name: "Pizza de cuatro quesos",
            quantity: 25,
            desc: "Esta es la mejor pizza del mundo",
            price: 15,
            image: "pizza.jpg",
        },
        {
            id: 3,
            name: "Ensalada",
            quantity: 30,
            desc: "Ensalada con ingredientes naturales",
            price: 7,
            image: "ensalada.jpeg",
        },
        {
            id: 4,
            name: "Bocadillo",
            quantity: 35,
            desc: "El bocata de la tía Paca",
            price: 5,
            image: "bocadillo.jpg",
        },
    ]);

    return (
        <foodItemsContext.Provider value={menuItems}>
            <div className="App">
                {!selectedFood ? (
                    <>
                        <button
                            className="toggleButton"
                            onClick={() => setIsChooseFoodPage((prev) => !prev)}
                        >
                            {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
                        </button>
                        <h3 className="title">Comida Rápida Online</h3>
                        {/* Mostrar stock solo si es admin */}
                        {!isChooseFoodPage && roles?.includes(Role.ADMIN) && (
                            <>
                                <h4 className="subTitle">Menús</h4>
                                <ul className="ulApp">
                                    {menuItems.map((item) => (
                                        <li key={item.id} className="liApp">
                                            <p>{item.name}</p>
                                            <p>#{item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {/* Mostrar menú solo si está autenticado */}
                        {isChooseFoodPage && isAuthenticated ? (
                            <Suspense fallback={<div>Cargando platos...</div>}>
                                <Foods foodItems={menuItems} onFoodSelected={setSelectedFood} />
                            </Suspense>
                        ) : (
                            isChooseFoodPage && <p>Debes iniciar sesión para hacer pedidos.</p>
                        )}
                    </>
                ) : (
                    isAuthenticated ? (
                        <FoodOrder
                            food={selectedFood}
                            onReturnToMenu={() => setSelectedFood(null)}
                        />
                    ) : (
                        <p>Debes iniciar sesión para hacer pedidos.</p>
                    )

                )}
                <>
                    {console.log(roles)}
                </>
            </div>
            <>
                {console.log(roles)}
            </>
        </foodItemsContext.Provider>
    );
};

export default MainComponent;