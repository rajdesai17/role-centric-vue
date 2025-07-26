import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockStores, mockRatings, mockUsers } from '@/utils/mockData';

const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  
  // Get stores owned by this user
  const userStores = mockStores.filter(store => store.ownerId === user?.id);
  const storeIds = userStores.map(store => store.id);
  
  // Get ratings for user's stores
  const storeRatings = mockRatings.filter(rating => 
    storeIds.includes(rating.storeId)
  );
  
  // Calculate average rating
  const averageRating = storeRatings.length > 0 
    ? (storeRatings.reduce((sum, rating) => sum + rating.rating, 0) / storeRatings.length)
    : 0;

  // Get users who rated the stores
  const ratingUsers = storeRatings.map(rating => {
    const ratingUser = mockUsers.find(u => u.id === rating.userId);
    const store = mockStores.find(s => s.id === rating.storeId);
    return {
      ...rating,
      userName: ratingUser?.name || 'Unknown User',
      storeName: store?.name || 'Unknown Store',
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your store performance and customer feedback
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Stores
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStores.length}</div>
            <p className="text-xs text-muted-foreground">
              Active stores
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <div className="p-2 rounded-lg bg-yellow-50">
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Ratings
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeRatings.length}</div>
            <p className="text-xs text-muted-foreground">
              Customer reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{store.name}</div>
                    <div className="text-sm text-muted-foreground">{store.address}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{store.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
              {userStores.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No stores found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingUsers.slice(0, 5).map((rating) => (
                <div key={rating.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{rating.userName}</div>
                    <div className="text-sm text-muted-foreground">{rating.storeName}</div>
                    <div className="text-xs text-muted-foreground">{rating.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {ratingUsers.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No ratings yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;