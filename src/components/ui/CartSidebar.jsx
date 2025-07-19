import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Modern Sofa Set',
      nameHi: 'आधुनिक सोफा सेट',
      price: 45000,
      originalPrice: 56250,
      quantity: 1,
      image: '/assets/images/sofa-set.jpg',
      color: 'Grey',
      colorHi: 'स्लेटी'
    },
    {
      id: 2,
      name: 'Dining Table',
      nameHi: 'खाना खाने की मेज',
      price: 25000,
      originalPrice: 31250,
      quantity: 1,
      image: '/assets/images/dining-table.jpg',
      color: 'Walnut',
      colorHi: 'अखरोट'
    }
  ]);

  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const delivery = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + delivery;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    onClose();
  };

  const text = {
    en: {
      cart: 'Shopping Cart',
      empty: 'Your cart is empty',
      startShopping: 'Start Shopping',
      color: 'Color',
      remove: 'Remove',
      subtotal: 'Subtotal',
      savings: 'You Save',
      delivery: 'Delivery',
      free: 'FREE',
      total: 'Total',
      checkout: 'Checkout Now',
      continue: 'Continue Shopping',
      items: 'items'
    },
    hi: {
      cart: 'शॉपिंग कार्ट',
      empty: 'आपका कार्ट खाली है',
      startShopping: 'खरीदारी शुरू करें',
      color: 'रंग',
      remove: 'हटाएं',
      subtotal: 'उप-योग',
      savings: 'आपकी बचत',
      delivery: 'डिलीवरी',
      free: 'मुफ्त',
      total: 'कुल',
      checkout: 'अभी चेकआउट करें',
      continue: 'खरीदारी जारी रखें',
      items: 'आइटम'
    }
  };

  const t = text[currentLanguage];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-60"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-70 transform furniture-transition ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              {t.cart} ({cartItems.length} {t.items})
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t.empty}
                </h3>
                <Button onClick={onClose} className="mt-4">
                  {t.startShopping}
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 pb-6 border-b border-border last:border-b-0">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={currentLanguage === 'hi' ? item.nameHi : item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {currentLanguage === 'hi' ? item.nameHi : item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t.color}: {currentLanguage === 'hi' ? item.colorHi : item.color}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={16} className="mr-1" />
                          {t.remove}
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-semibold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-success">{t.savings}</span>
                    <span className="font-medium text-success">-{formatPrice(savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.delivery}</span>
                  <span className="font-medium">
                    {delivery === 0 ? t.free : formatPrice(delivery)}
                  </span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full furniture-shadow-cta"
                  size="lg"
                >
                  {t.checkout}
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  {t.continue}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;