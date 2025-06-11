export const mockProperties = [
  {
    id: '1',
    title: 'Stunning Ocean View Villa with Private Pileta',
    location: 'Malibu, California, USA',
    price: 450,
    rating: 4.95,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true,
      joinedYear: 2018
    },
    amenities: ['Wifi', 'Mascotas', 'Pileta', 'Estacionamiento', 'AC', 'Ocean View', 'Hot Tub', 'BBQ Grill'],
    description: 'Experience luxury living in this stunning oceanfront villa with breathtaking panoramic views of the Pacific Ocean. This modern retreat features floor-to-ceiling windows, a private infinity Pileta, and direct beach access.',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    propertyType: 'Villa',
    coordinates: { lat: 34.0259, lng: -118.7798 }
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin with Fireplace',
    location: 'Aspen, Colorado, USA',
    price: 280,
    rating: 4.87,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Michael Roberts',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: false,
      joinedYear: 2020
    },
    amenities: ['Wifi', 'Mascotas', 'Fireplace', 'Estacionamiento', 'Heating', 'Mountain View', 'Ski Storage'],
    description: 'Escape to this charming mountain cabin surrounded by snow-capped peaks. Perfect for a cozy retreat with rustic charm and modern amenities.',
    bedrooms: 2,
    bathrooms: 2,
    guests: 6,
    propertyType: 'Cabin',
    coordinates: { lat: 39.1911, lng: -106.8175 }
  },
  {
    id: '3',
    title: 'Modern Downtown Loft with City Views',
    location: 'New York, New York, USA',
    price: 320,
    rating: 4.92,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true,
      joinedYear: 2019
    },
    amenities: ['Wifi', 'Mascotas', 'AC', 'Elevator', 'City View', 'Rooftop Access', 'Gym'],
    description: 'Stylish loft in the heart of Manhattan with floor-to-ceiling windows and stunning city skyline views. Walking distance to subway and major attractions.',
    bedrooms: 1,
    bathrooms: 1,
    guests: 4,
    propertyType: 'Loft',
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: '4',
    title: 'Tropical Beach House Paradise',
    location: 'Tulum, Quintana Roo, Mexico',
    price: 380,
    rating: 4.98,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Carlos Mendez',
      avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true,
      joinedYear: 2017
    },
    amenities: ['Wifi', 'Mascotas', 'Pileta', 'Beach Access', 'AC', 'Tropical Garden', 'Hammock'],
    description: 'Wake up to the sound of waves in this beautiful beachfront casa. Featuring traditional Mexican architecture with modern amenities and direct beach access.',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    propertyType: 'Beach House',
    coordinates: { lat: 20.2114, lng: -87.4654 }
  },
  {
    id: '5',
    title: 'Historic Castle with Garden Views',
    location: 'Edinburgh, Scotland, UK',
    price: 520,
    rating: 4.89,
    reviewCount: 78,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Lady Margaret Stewart',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: true,
      joinedYear: 2016
    },
    amenities: ['Wifi', 'Mascotas', 'Fireplace', 'Garden', 'Library', 'Historical Features', 'Estacionamiento'],
    description: 'Stay in a piece of history in this beautifully restored 16th-century castle. Experience royal treatment with modern comforts in the heart of Scotland.',
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    propertyType: 'Castle',
    coordinates: { lat: 55.9533, lng: -3.1883 }
  },
  {
    id: '6',
    title: 'Minimalist Desert Retreat',
    location: 'Joshua Tree, California, USA',
    price: 220,
    rating: 4.94,
    reviewCount: 112,
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    host: {
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150',
      superhost: false,
      joinedYear: 2021
    },
    amenities: ['Wifi', 'Mascotas', 'AC', 'Desert View', 'Stargazing Deck', 'Solar Power', 'Hot Tub'],
    description: 'Disconnect from the world in this stunning minimalist retreat surrounded by Joshua Tree National Park. Perfect for stargazing and desert adventures.',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    propertyType: 'Desert House',
    coordinates: { lat: 34.1347, lng: -116.3117 }
  }
];