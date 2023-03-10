import { useState, useEffect } from 'react'
import '../styles/Cart.css'

function Cart({ cart, updateCart }) {
  const [isOpen, setIsOpen] = useState(true)
  const total = cart.reduce(
    (acc, plantType) => acc + plantType.amount * plantType.price, 0
  )

  // useEffect permet d'effectuer notre effet une fois le rendu du composant terminé. Ici je veux que l'alerte ne s'affiche que lorsque le total de mon panier change :
  /*useEffect(() => {
    alert(`J'aurai ${total}€ à payer 💸`)
  }, [total])*/

  // Pour exécuter un effet uniquement après le 1er render de mon composant pour récupérer des données sur une API : il faut renseigner un tableau de dépendances vide
  /*useEffect(() => {
    alert('Bienvenue dans La maison jungle')
  }, [])*/

  // Mettre à jour le titre de l'onglet du navigateur :
  useEffect(() => {
    document.title = `LMJ: ${total}€ d'achats`
  }, [total])

  return isOpen ? (
    <div className='lmj-cart'>
      <button className='lmj-cart-toggle-button' onClick={() => setIsOpen(false)}>
        Fermer
      </button>

      {cart.length > 0 ? (
        <div>
          <h2>Panier</h2>
          <ul>
            {cart.map(({ name, price, amount }, index) => (
              <div key={`${name}-${index}`}>
                {name} {price}€ x {amount}
              </div>
            ))}
          </ul>
          <h3>Total :{total}€</h3>
          <button onClick={() => updateCart([])}>Vider le panier</button>
        </div>
      ) : (
        <div>Votre panier est vide</div>
      )}
    </div>
  ) : (
    <div className='lmj-cart-closed'>
      <button className='lmj-cart-toggle-button' onClick={() => setIsOpen(true)}>
        Ouvrir le Panier
      </button>
    </div>
  )
}

export default Cart