export interface Provider {
  id: number;
  name: string;
  email: string;
  device_token: null; // Adjust the type if it can be a different type
  isNotificationAllowed: number;
  otp: null; // Adjust the type if it can be a different type
  mobile_number: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  working_hours: string; // This appears to be a JSON string; consider parsing it if needed
  timezone: null; // Adjust the type if it can be a different type
  experience: number;
  rate: string;
  specialization: string;
  portfolio: string;
  profile_pic: string;
  created_at: string;
  updated_at: string;
  email_verified_at: null; // Adjust the type if it can be a different type
  category_id: number;
  service_id: number;
  isAdmin: number;
  otp_valid_until: null; // Adjust the type if it can be a different type
  business_hours_enabled: number;
  skills: string;
  service?: ServiceForProvider; // Optional, only included in the details response
}
interface CategoryForService {
  id: number;
  name: string;
  image: string;
  discount: null; // Adjust the type if the discount can be a different type
  created_at: string;
  updated_at: string;
}

interface ServiceForProvider {
  id: number;
  name: string;
  category_id: number;
  images: string; // This appears to be a JSON string of an array; consider parsing it if needed
  price: null; // Adjust the type if price can be a different type
  discount: null; // Adjust the type if discount can be a different type
  created_at: string;
  updated_at: string;
  category: CategoryForService;
}
