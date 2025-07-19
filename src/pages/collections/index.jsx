import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';

const CollectionsPage = () => {
  const collections = [
    {
      id: 'modern-living',
      name: 'Modern Living',
      description: 'Contemporary furniture for modern homes',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      productCount: 45
    },
    {
      id: 'cozy-bedroom',
      name: 'Cozy Bedroom',
      description: 'Comfortable and stylish bedroom furniture',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop',
      productCount: 32
    },
    {
      id: 'office-essentials',
      name: 'Office Essentials',
      description: 'Professional workspace solutions',
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
      productCount: 28
    },
    {
      id: 'dining-elegance',
      name: 'Dining Elegance',
      description: 'Elegant dining room furniture',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
      productCount: 36
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Shop Collections
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Discover our curated furniture collections designed for every room and style
              </p>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="max-w-screen-2xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-card rounded-xl border border-border overflow-hidden furniture-shadow-card hover:shadow-xl furniture-transition cursor-pointer group"
                onClick={() => window.location.href = `/collections/${collection.id}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-48 object-cover group-hover:scale-110 furniture-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.productCount} products</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">Explore Collection</span>
                    <Icon name="ArrowRight" size={16} className="text-primary group-hover:translate-x-1 furniture-transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectionsPage; 
