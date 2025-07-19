import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manual featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Modern Leather Sofa",
      description: "Premium leather sofa with elegant design and superior comfort. Perfect for living rooms.",
      price: 45000,
      sale_price: 38000,
      rating: 4.8,
      views: 1200,
      stock: 15,
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      description: "Professional office chair with adjustable features and lumbar support for long work hours.",
      price: 12000,
      sale_price: null,
      rating: 4.6,
      views: 850,
      stock: 8,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      name: "Rustic Dining Table",
      description: "Beautiful wooden dining table with natural finish. Seats 6-8 people comfortably.",
      price: 28000,
      sale_price: 22000,
      rating: 4.9,
      views: 1500,
      stock: 12,
      images: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      name: "Queen Size Bed Frame",
      description: "Elegant bed frame with upholstered headboard and sturdy construction.",
      price: 35000,
      sale_price: null,
      rating: 4.7,
      views: 950,
      stock: 20,
      images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      name: "Accent Armchair",
      description: "Stylish accent chair with velvet upholstery and gold-finished legs.",
      price: 18000,
      sale_price: 15000,
      rating: 4.5,
      views: 1100,
      stock: 6,
      images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      name: "Bookshelf with Drawers",
      description: "Multi-functional bookshelf with built-in drawers for extra storage space.",
      price: 22000,
      sale_price: null,
      rating: 4.4,
      views: 750,
      stock: 10,
      images: ["https://images.unsplash.com/photo-1594620302200-9a762878a8d7?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      name: "Coffee Table Set",
      description: "Modern coffee table with matching side tables. Perfect for living room setup.",
      price: 25000,
      sale_price: 20000,
      rating: 4.8,
      views: 1300,
      stock: 4,
      images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      name: "Wardrobe Cabinet",
      description: "Spacious wardrobe with hanging space and multiple shelves for organized storage.",
      price: 42000,
      sale_price: null,
      rating: 4.6,
      views: 900,
      stock: 7,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('furniture-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setProducts(featuredProducts);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (originalPrice, salePrice) => {
    if (!salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product?.name);
    // Dispatch cart event
    window.dispatchEvent(new CustomEvent('furniture-cart', {
      detail: { action: 'add', product }
    }));
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product?.name);
  };

  const content = {
    en: {
      title: "Featured Products",
      subtitle: "Discover our most popular furniture pieces",
      addToCart: "Add to Cart",
      quickView: "Quick View",
      sale: "SALE",
      off: "OFF",
      viewAll: "View All Products",
      new: "NEW",
      bestseller: "BESTSELLER",
      trending: "TRENDING"
    },
    hi: {
      title: "विशेष उत्पाद",
      subtitle: "हमारे सबसे लोकप्रिय फर्नीचर का आनंद लें",
      addToCart: "कार्ट में जोड़ें",
      quickView: "तुरंत देखें",
      sale: "बिक्री",
      off: "छूट",
      viewAll: "सभी उत्पाद देखें",
      new: "नया",
      bestseller: "बेस्टसेलर",
      trending: "ट्रेंडिंग"
    }
  };

  const t = content[currentLanguage];

  if (loading) {
    return (
      <section id="deals" className="section-padding bg-background">
        <div className="max-w-screen-2xl mx-auto container-padding">
          <div className="section-header">
            <h2 className="section-title">
              {t.title}
            </h2>
            <p className="section-subtitle">
              {t.subtitle}
            </p>
          </div>
          
          <div className="furniture-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="furniture-card animate-pulse">
                <div className="skeleton-image"></div>
                <div className="p-6">
                  <div className="skeleton-text mb-2"></div>
                  <div className="skeleton-title mb-4"></div>
                  <div className="skeleton-text mb-4"></div>
                  <div className="h-12 bg-muted rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="deals" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-screen-2xl mx-auto container-padding">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            {t.title}
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="furniture-grid mb-16">
          {products?.map((product, index) => {
            const discount = calculateDiscount(product?.price, product?.sale_price);
            const isNew = product?.created_at && new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const isBestseller = product?.rating >= 4.5;
            const isTrending = product?.views > 1000;
            
            return (
              <div
                key={product?.id}
                className="product-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="product-card-image">
                  <img
                    src={product?.images?.[0] || '/assets/images/no_image.png'}
                    alt={product?.name || 'Product'}
                    className="w-full h-64 object-cover group-hover:scale-110 group-hover:rotate-1 furniture-transition"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product?.sale_price && (
                      <div className="badge-sale">
                        {discount}% {t.off}
                      </div>
                    )}
                    {isNew && (
                      <div className="badge-primary">
                        {t.new}
                      </div>
                    )}
                    {isBestseller && (
                      <div className="badge-accent">
                        {t.bestseller}
                      </div>
                    )}
                    {isTrending && (
                      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                        {t.trending}
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 furniture-transition flex items-center justify-center space-x-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleQuickView(product)}
                      className="bg-background text-foreground hover:bg-muted shadow-lg"
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      {t.quickView}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-lg"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      {t.addToCart}
                    </Button>
                  </div>

                  {/* Rating */}
                  {product?.rating && (
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 rounded-full px-3 py-1 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-500" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {product?.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product?.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {product?.sale_price ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.sale_price)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(product?.price)}
                        </span>
                      )}
                    </div>
                    
                    {product?.stock && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary"
                    iconName="ShoppingCart"
                    iconPosition="right"
                  >
                    {t.addToCart}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products */}
        <div className="text-center">
          <Button
            size="lg"
            className="btn-outline text-lg px-12 py-4"
            iconName="ArrowRight"
            iconPosition="right"
          >
            {t.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
