export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  image: string;
  images: string[];
  units: number;
  status: 'Completed' | 'Under Construction' | 'Pre-Construction' | 'Coming Soon';
  completionDate: string;
  amenities: string[];
  schools: string[];
  shopping: string[];
  transit: string[];
  floorPlans: FloorPlan[];
  features: string[];
  lat: number;
  lng: number;
  type: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  image: string;
  svg: string;
}

export interface RentalProperty {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  sqft: number;
  availabilityDate: string;
  address: string;
  city: string;
  province: string;
  amenities: string[];
  projectId: string;
  projectName: string;
  lat: number;
  lng: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  project?: string;
  budget?: string;
  propertyType?: string;
  moveInDate?: string;
  notes?: string;
  type: 'purchase' | 'rental' | 'viewing' | 'contact';
  createdAt: string;
}

export interface ViewingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  description: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager';
}

export interface AnalyticsData {
  totalLeads: number;
  totalViewings: number;
  totalPurchases: number;
  monthlyLeads: { month: string; count: number }[];
  projectInquiries: { project: string; count: number }[];
  viewingRequests: { month: string; count: number }[];
}
