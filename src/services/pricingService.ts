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
  image: string;
  included: string[];
  notIncluded: string[];
  youNeedToBring: string[];
  additionalAnimalPrice: number;
  additionalAnimalDays: number;
  extras: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    perDay?: boolean;
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

    // Define image arrays for each animal type
    const animalImages: Record<string, string[]> = {
      'Red Deer': [
        '/assets/img/gallimg/redstag/1.png',
        '/assets/img/gallimg/redstag/2.png',
        '/assets/img/gallimg/redstag/3.png',
        '/assets/img/gallimg/redstag/4.png',
        '/assets/img/gallimg/redstag/5.png',
        '/assets/img/gallimg/redstag/6.png',
        '/assets/img/gallimg/redstag/7.png',
        '/assets/img/gallimg/redstag/8.png',
        '/assets/img/gallimg/redstag/9.png',
        '/assets/img/gallimg/redstag/10.png',
        '/assets/img/gallimg/redstag/11.png',
        '/assets/img/gallimg/redstag/12.png',
        '/assets/img/gallimg/redstag/13.png',
        '/assets/img/gallimg/redstag/14.png',
        '/assets/img/gallimg/redstag/15.png',
        '/assets/img/gallimg/redstag/16.png',
        '/assets/img/gallimg/redstag/17.png',
        '/assets/img/gallimg/redstag/18.png',
        '/assets/img/gallimg/redstag/19.png',
        '/assets/img/gallimg/redstag/20.png',
        '/assets/img/gallimg/redstag/21.png'
      ],
      'Himalayan Tahr': [
        '/assets/img/gallimg/Tahr/1.png',
        '/assets/img/gallimg/Tahr/2.png',
        '/assets/img/gallimg/Tahr/3.png',
        '/assets/img/gallimg/Tahr/4.png',
        '/assets/img/gallimg/Tahr/5.png',
        '/assets/img/gallimg/Tahr/6.png',
        '/assets/img/gallimg/Tahr/7.png',
        '/assets/img/gallimg/Tahr/9.png',
        '/assets/img/gallimg/Tahr/11.png',
        '/assets/img/gallimg/Tahr/12.png',
        '/assets/img/gallimg/Tahr/14.png',
        '/assets/img/gallimg/Tahr/15.png',
        '/assets/img/gallimg/Tahr/16.png',
        '/assets/img/gallimg/Tahr/17.png',
        '/assets/img/gallimg/Tahr/18.png',
        '/assets/img/gallimg/Tahr/19.png',
        '/assets/img/gallimg/Tahr/20.png',
        '/assets/img/gallimg/Tahr/21.png',
        '/assets/img/gallimg/Tahr/22.png',
        '/assets/img/gallimg/Tahr/23.png',
        '/assets/img/gallimg/Tahr/24.png',
        '/assets/img/gallimg/Tahr/25.png',
        '/assets/img/gallimg/Tahr/26.png',
        '/assets/img/gallimg/Tahr/27.png',
        '/assets/img/gallimg/Tahr/28.png',
        '/assets/img/gallimg/Tahr/29.png',
        '/assets/img/gallimg/Tahr/30.png',
        '/assets/img/gallimg/Tahr/31.png',
        '/assets/img/gallimg/Tahr/32.png',
        '/assets/img/gallimg/Tahr/33.png',
        '/assets/img/gallimg/Tahr/34.png',
        '/assets/img/gallimg/Tahr/35.png',
        '/assets/img/gallimg/Tahr/36.png',
        '/assets/img/gallimg/Tahr/37.png',
        '/assets/img/gallimg/Tahr/38.png',
        '/assets/img/gallimg/Tahr/39.png',
        '/assets/img/gallimg/Tahr/40.png',
        '/assets/img/gallimg/Tahr/41.png',
        '/assets/img/gallimg/Tahr/42.png',
        '/assets/img/gallimg/Tahr/43.png',
        '/assets/img/gallimg/Tahr/44.png',
        '/assets/img/gallimg/Tahr/46.png',
        '/assets/img/gallimg/Tahr/47.png',
        '/assets/img/gallimg/Tahr/48.png',
        '/assets/img/gallimg/Tahr/49.png',
        '/assets/img/gallimg/Tahr/51.png'
      ],
      'Chamois': [
        '/assets/img/gallimg/Chamois/1.png',
        '/assets/img/gallimg/Chamois/2.png',
        '/assets/img/gallimg/Chamois/3.png',
        '/assets/img/gallimg/Chamois/4.png',
        '/assets/img/gallimg/Chamois/5.png',
        '/assets/img/gallimg/Chamois/6.png',
        '/assets/img/gallimg/Chamois/7.png',
        '/assets/img/gallimg/Chamois/8.png',
        '/assets/img/gallimg/Chamois/9.png',
        '/assets/img/gallimg/Chamois/10.png',
        '/assets/img/gallimg/Chamois/11.png',
        '/assets/img/gallimg/Chamois/12.png',
        '/assets/img/gallimg/Chamois/13.png',
        '/assets/img/gallimg/Chamois/14.png',
        '/assets/img/gallimg/Chamois/15.png',
        '/assets/img/gallimg/Chamois/16.png',
        '/assets/img/gallimg/Chamois/17.png',
        '/assets/img/gallimg/Chamois/18.png',
        '/assets/img/gallimg/Chamois/19.png',
        '/assets/img/gallimg/Chamois/20.png',
        '/assets/img/gallimg/Chamois/21.png',
        '/assets/img/gallimg/Chamois/22.png',
        '/assets/img/gallimg/Chamois/23.png',
        '/assets/img/gallimg/Chamois/24.png',
        '/assets/img/gallimg/Chamois/25.png',
        '/assets/img/gallimg/Chamois/26.png',
        '/assets/img/gallimg/Chamois/27.png',
        '/assets/img/gallimg/Chamois/28.png',
        '/assets/img/gallimg/Chamois/29.png',
        '/assets/img/gallimg/Chamois/30.jpg',
        '/assets/img/gallimg/Chamois/31.jpg',
        '/assets/img/gallimg/Chamois/32.jpg',
        '/assets/img/gallimg/Chamois/33.jpg',
        '/assets/img/gallimg/Chamois/34.jpg',
        '/assets/img/gallimg/Chamois/35.png',
        '/assets/img/gallimg/Chamois/36.png',
        '/assets/img/gallimg/Chamois/37.png'
      ]
    };

    Object.values(data.animals).forEach(animal => {
      const images = animalImages[animal.species] || [animal.image];
      let imageIndex = 0;
      
      Object.values(animal.hunts).forEach(hunt => {
        // Assign different image to each hunt package
        const huntImage = images[imageIndex % images.length];
        imageIndex++;
        
        hunts.push({
          ...hunt,
          species: animal.species,
          image: huntImage,
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
    if (quantity <= 1) {
      return hunt.basePrice;
    }
    
    // First animal at base price, additional animals at additional animal price
    return hunt.basePrice + (hunt.additionalAnimalPrice * (quantity - 1));
  }

  calculateHuntDays(hunt: HuntData, quantity: number): number {
    if (quantity <= 1) {
      return hunt.baseDays;
    }
    
    // First animal takes base days, additional animals take additional animal days
    return hunt.baseDays + (hunt.additionalAnimalDays * (quantity - 1));
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
    return this.pricingData?.dayRates || { solo: 290, additionalHunter: 200, nonHunter: 180 };
  }

  getBookingInfo() {
    return this.pricingData?.booking || { deposit: 500, currency: 'AUD', depositNote: 'Non-refundable deposit required on booking' };
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
      breakdown.push({
        item: `${hunt.name} (${quantity}x)`,
        price: huntPrice,
        description: `${quantity} ${hunt.species}${quantity > 1 ? 's' : ''}`
      });
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
      
      const extraPrice = extra.perDay 
        ? extra.price * selectedExtra.quantity * totalDays
        : extra.price * selectedExtra.quantity;
      
      breakdown.push({
        item: extra.name,
        price: extraPrice,
        description: `${selectedExtra.quantity}x ${extra.description}${extra.perDay ? ` for ${totalDays} days` : ''}`
      });
    });

    return breakdown;
  }
}

export const pricingService = new PricingService(); 