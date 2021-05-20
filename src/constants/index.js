import elevator from './assets/amenities/elevator.png';
import wifi from './assets/amenities/wifi.png';
import tv from './assets/amenities/tv.png';
import kitchen from './assets/amenities/kitchen.png';
import picture from './assets/amenities/picture.png';
import bathtube from './assets/amenities/bathtube.png';
import swimmingPool from './assets/amenities/swimmingPool.png';
import heating from './assets/amenities/heater.png';
import parking from './assets/amenities/parking.png';

import catering from './assets/specialFeatures/catering.png';
import dinnertable from './assets/specialFeatures/dinner-table.png';
import dj from './assets/specialFeatures/dj.png';

export const AMENITIES_LIST = {
  elevator: elevator,
  kitchen: kitchen,
  'greate-views': picture,
  'wi-fi': wifi,
  bathroom: bathtube,
  'swimming pool': swimmingPool,
  smarttv: tv,
  heating: heating,
  parking: parking
};

export const SPECIAL_FEATURES = [
  { id: 1, name: 'Catering', icon: catering },
  { id: 2, name: 'Tables and chairs', icon: dinnertable },
  { id: 3, name: 'DJ', icon: dj }
];

export const EVENTS_TYPES = ['Wedding Venues', 'Conference Room', 'Rooftop Terrace'];
export const GUEST_LIST = ['1-30 people', '31-200 people'];
