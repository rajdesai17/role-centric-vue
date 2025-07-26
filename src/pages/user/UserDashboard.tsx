import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MapPin, Search } from 'lucide-react';
import { mockStores, mockRatings } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState(
    mockRatings.filter(rating => rating.userId === user?.id)
  );

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserRating = (storeId: string) => {
    return userRatings.find(rating => rating.storeId === storeId)?.rating || 0;
  };

  const handleRateStore = (storeId: string, rating: number) => {
    const existingRating = userRatings.find(r => r.storeId === storeId);
    
    if (existingRating) {
      setUserRatings(prev =>
        prev.map(r => r.storeId === storeId ? { ...r, rating } : r)
      );
      toast({
        title: "Rating updated",
        description: `Updated rating to ${rating} stars`,
      });
    } else {
      const newRating = {
        id: Date.now().toString(),
        userId: user!.id,
        storeId,
        rating,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUserRatings(prev => [...prev, newRating]);
      toast({
        title: "Rating submitted",
        description: `Rated ${rating} stars`,
      });
    }
  };

  const renderStars = (storeId: string) => {
    const userRating = getUserRating(storeId);
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6"
            onClick={() => handleRateStore(storeId, star)}
          >
            <Star
              className={`h-4 w-4 ${
                star <= userRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Store Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Discover and rate amazing stores
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Stores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by store name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => (
          <Card key={store.id} className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">{store.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {store.address}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{store.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Your Rating</div>
                <div className="flex items-center gap-2">
                  {renderStars(store.id)}
                  {getUserRating(store.id) > 0 && (
                    <span className="text-sm text-muted-foreground ml-2">
                      ({getUserRating(store.id)} stars)
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No stores found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDashboard;