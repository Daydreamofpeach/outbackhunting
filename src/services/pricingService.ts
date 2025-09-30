export interface HuntData {
  id: string;
  name: string;
  species: string;
  basePrice: number;
  baseDays: number;
  location: string;
  bestSeason: string;
  difficulty: string;
  description: string;
  included: string[];
  notIncluded: string[];
  youNeedToBring: string[];
  additionalAnimalPrice: number;
  additionalAnimalDays: number;
  priceOnApplication?: boolean;
  extras: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    perDay?: boolean;
    priceOnApplication?: boolean;
  }>;
}

export interface PricingData {
  animals: {
    [key: string]: {
      name: string;
      species: string;
      image: string;
      baseIncluded: string[];
      baseNotIncluded: string[];
      baseYouNeedToBring: string[];
      extras: Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        perDay?: boolean;
        priceOnApplication?: boolean;
      }>;
        hunts: {
          [key: string]: {
            id: string;
            name: string;
            basePrice: number;
            baseDays: number;
            location: string;
            bestSeason: string;
            difficulty: string;
            description: string;
            additionalAnimalPrice: number;
            additionalAnimalDays: number;
            priceOnApplication?: boolean;
          };
        };
    };
  };
  dayRates: {
    solo: number;
    additionalHunter: number;
    nonHunter: number;
  };
  booking: {
    deposit: number;
    currency: string;
    depositNote: string;
  };
}

class PricingService {
  private pricingData: PricingData | null = null;

  async loadPricingData(): Promise<PricingData> {
    if (this.pricingData) {
      return this.pricingData;
    }

    try {
      const response = await fetch('/pricing.json');
      const data = await response.json();
      this.pricingData = data;
      return data;
    } catch (error) {
      console.error('Failed to load pricing data:', error);
      throw new Error('Failed to load pricing data');
    }
  }

  async getAllHunts(): Promise<HuntData[]> {
    const data = await this.loadPricingData();
    const hunts: HuntData[] = [];


    Object.values(data.animals).forEach(animal => {
      Object.values(animal.hunts).forEach(hunt => {
        hunts.push({
          ...hunt,
          species: animal.species,
          included: animal.baseIncluded,
          notIncluded: animal.baseNotIncluded,
          youNeedToBring: animal.baseYouNeedToBring,
          extras: animal.extras
        });
      });
    });

    return hunts;
  }

  async getHuntById(huntId: string): Promise<HuntData | null> {
    const hunts = await this.getAllHunts();
    return hunts.find(hunt => hunt.id === huntId) || null;
  }

  async getHuntsBySpecies(species: string): Promise<HuntData[]> {
    const hunts = await this.getAllHunts();
    return hunts.filter(hunt => hunt.species === species);
  }

  calculateHuntPrice(hunt: HuntData, quantity: number): number {
    if (hunt.priceOnApplication) {
      return 0; // Return 0 for POA hunts
    }
    
    if (quantity <= 1) {
      return hunt.basePrice;
    }
    
    // For private land hunts, additional animals cost the same as the base price
    // For wilderness hunts, additional animals cost 90% of base price (rounded down)
    if (hunt.location === 'Private Land') {
      return hunt.basePrice * quantity;
    } else {
      // First animal at base price, additional animals at 90% of base price
      const additionalAnimalPrice = Math.floor(hunt.basePrice * 0.9);
      return hunt.basePrice + (additionalAnimalPrice * (quantity - 1));
    }
  }

  calculateHuntDays(hunt: HuntData, quantity: number): number {
    if (quantity <= 1) {
      return hunt.baseDays;
    }
    
    // For all hunts, additional animals only add 1 day each
    // Base days for first animal + 1 day per additional animal
    return hunt.baseDays + (quantity - 1);
  }

  calculatePackagePrice(
    hunts: Array<{ hunt: HuntData; quantity: number }>,
    additionalDays: number,
    people: { hunters: number; nonHunters: number },
    selectedExtras: Array<{ extraId: string; huntId: string; quantity: number }>,
    totalDays: number
  ): number {
    const data = this.pricingData;
    if (!data) return 0;

    // Calculate hunt costs
    const huntTotal = hunts.reduce((sum, { hunt, quantity }) => {
      return sum + this.calculateHuntPrice(hunt, quantity);
    }, 0);

    // Calculate additional days cost
    const additionalDaysCost = additionalDays * data.dayRates.solo;

    // Calculate extras cost
    const extrasCost = selectedExtras.reduce((sum, selectedExtra) => {
      const hunt = hunts.find(h => h.hunt.id === selectedExtra.huntId);
      if (!hunt) return sum;
      
      const extra = hunt.hunt.extras.find(e => e.id === selectedExtra.extraId);
      if (!extra) return sum;
      
      // Skip POA extras in cost calculation
      if (extra.priceOnApplication) return sum;
      
      if (extra.perDay) {
        return sum + (extra.price * selectedExtra.quantity * totalDays);
      } else {
        return sum + (extra.price * selectedExtra.quantity);
      }
    }, 0);

    // Calculate people costs
    const huntersCost = people.hunters > 1 ? (people.hunters - 1) * data.dayRates.additionalHunter * totalDays : 0;
    const nonHuntersCost = people.nonHunters * data.dayRates.nonHunter * totalDays;
    
    return huntTotal + additionalDaysCost + extrasCost + huntersCost + nonHuntersCost;
  }

  calculatePackageDays(
    hunts: Array<{ hunt: HuntData; quantity: number }>,
    additionalDays: number
  ): number {
    if (hunts.length === 0) {
      return additionalDays;
    }

    // Group hunts by location to calculate overlapping days
    const huntsByLocation = hunts.reduce((groups, { hunt, quantity }) => {
      const location = hunt.location;
      if (!groups[location]) {
        groups[location] = [];
      }
      groups[location].push({ hunt, quantity });
      return groups;
    }, {} as Record<string, Array<{ hunt: HuntData; quantity: number }>>);

    let totalDays = 0;

    // Calculate days for each location group
    Object.values(huntsByLocation).forEach(locationHunts => {
      if (locationHunts.length === 1) {
        // Single hunt in this location
        const { hunt, quantity } = locationHunts[0];
        totalDays += this.calculateHuntDays(hunt, quantity);
      } else {
        // Multiple hunts in same location - calculate with overlap
        const totalAnimals = locationHunts.reduce((sum, { quantity }) => sum + quantity, 0);
        
        // For multiple hunts in same location: base days for first animal, additional animal days per additional animal
        if (totalAnimals === 1) {
          const maxBaseDays = Math.max(...locationHunts.map(({ hunt }) => hunt.baseDays));
          totalDays += maxBaseDays;
        } else {
          // Find the hunt with the most base days and use that as the foundation
          const primaryHunt = locationHunts.reduce((max, current) => 
            current.hunt.baseDays > max.hunt.baseDays ? current : max
          );
          
          totalDays += this.calculateHuntDays(primaryHunt.hunt, totalAnimals);
        }
      }
    });

    return totalDays + additionalDays;
  }

  getDayRates() {
    return this.pricingData?.dayRates || { solo: 380, additionalHunter: 600, nonHunter: 180 };
  }

  getBookingInfo() {
    return this.pricingData?.booking || { deposit: 0.25, currency: 'NZD', depositNote: 'A 25% deposit is required to secure your booking. Final payment is due at the conclusion of your hunt as pricing may vary based on your specific requirements and additional services.' };
  }

  generateBillBreakdown(
    hunts: Array<{ hunt: HuntData; quantity: number }>,
    additionalDays: number,
    people: { hunters: number; nonHunters: number },
    selectedExtras: Array<{ extraId: string; huntId: string; quantity: number }>,
    totalDays: number
  ) {
    const data = this.pricingData;
    if (!data) return [];

    const breakdown = [];

    // Hunt costs
    hunts.forEach(({ hunt, quantity }) => {
      const huntPrice = this.calculateHuntPrice(hunt, quantity);
      if (hunt.priceOnApplication) {
        breakdown.push({
          item: `${hunt.name} (${quantity}x)`,
          price: 0,
          description: `Price on Application - ${quantity} ${hunt.species}${quantity > 1 ? 's' : ''}`
        });
      } else {
        breakdown.push({
          item: `${hunt.name} (${quantity}x)`,
          price: huntPrice,
          description: `${quantity} ${hunt.species}${quantity > 1 ? 's' : ''}`
        });
      }
    });

    // Additional days
    if (additionalDays > 0) {
      breakdown.push({
        item: 'Additional Days',
        price: additionalDays * data.dayRates.solo,
        description: `${additionalDays} day(s) at $${data.dayRates.solo}/day`
      });
    }

    // People costs
    if (people.hunters > 1) {
      const additionalHunters = people.hunters - 1;
      breakdown.push({
        item: 'Additional Hunters',
        price: additionalHunters * data.dayRates.additionalHunter * totalDays,
        description: `${additionalHunters} additional hunter(s) at $${data.dayRates.additionalHunter}/day for ${totalDays} days`
      });
    }

    if (people.nonHunters > 0) {
      breakdown.push({
        item: 'Non-Hunters',
        price: people.nonHunters * data.dayRates.nonHunter * totalDays,
        description: `${people.nonHunters} non-hunter(s) at $${data.dayRates.nonHunter}/day for ${totalDays} days`
      });
    }

    // Extras
    selectedExtras.forEach(selectedExtra => {
      const hunt = hunts.find(h => h.hunt.id === selectedExtra.huntId);
      if (!hunt) return;
      
      const extra = hunt.hunt.extras.find(e => e.id === selectedExtra.extraId);
      if (!extra) return;
      
      if (extra.priceOnApplication) {
        breakdown.push({
          item: extra.name,
          price: 0,
          description: `${selectedExtra.quantity}x ${extra.description} - Price on Application`
        });
      } else {
        const extraPrice = extra.perDay 
          ? extra.price * selectedExtra.quantity * totalDays
          : extra.price * selectedExtra.quantity;
        
        breakdown.push({
          item: extra.name,
          price: extraPrice,
          description: `${selectedExtra.quantity}x ${extra.description}${extra.perDay ? ` for ${totalDays} days` : ''}`
        });
      }
    });

    return breakdown;
  }
}

export const pricingService = new PricingService(); 