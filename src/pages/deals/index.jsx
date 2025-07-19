import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';

const DealsPage = () => {
  const deals = [
    {
      id: 'flash-sale',
      name: 'Flash Sale',
      discount: '50% OFF',
      color: 'text-red-600',
      description: 'Limited time offers on selected items',
      endDate: '2024-01-31',
      productCount: 25
    },
    {
      id: 'clearance',
      name: 'Clearance Items',
      discount: '30% OFF',
      color: 'text-orange-600',
      description: 'Great deals on clearance furniture',
      endDate: '2024-02-15',
      productCount: 18
    },
    {
      id: 'bundles',
      name: 'Bundle Offers',
      discount: 'Buy 2 Get 1',
      color: 'text-green-600',
      description: 'Save more with our bundle deals',
      endDate: '2024-02-28',
      productCount: 12
    },
    {
      id: 'new-arrivals',
      name: 'New Arrivals',
      discount: '25% OFF',
      color: 'text-blue-600',
      description: 'Latest furniture with special pricing',
      endDate: '2024-03-15',
      productCount: 35
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-accent to-accent-light text-accent-foreground py-20">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Featured Deals
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Unbeatable prices on premium furniture - don't miss these amazing offers!
              </p>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="max-w-screen-2xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="bg-card rounded-xl border border-border overflow-hidden furniture-shadow-card hover:shadow-xl furniture-transition cursor-pointer group"
                onClick={() => window.location.href = `/deals/${deal.id}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">{deal.name}</h3>
                    <span className={`text-2xl font-bold ${deal.color}`}>
                      {deal.discount}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {deal.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Products:</span>
                      <span className="font-semibold">{deal.productCount} items</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ends:</span>
                      <span className="font-semibold text-red-600">{deal.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">Shop Now</span>
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

export default DealsPage; 
