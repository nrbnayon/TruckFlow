// Mock data for the trucking SaaS platform
export interface Truck {
  id: string
  number: string
  make: string
  model: string
  year: number
  status: "active" | "maintenance" | "idle"
  driver?: string
  location: string
  mileage: number
  nextMaintenance: string
}

export interface Load {
  id: string
  loadNumber: string
  origin: string
  destination: string
  status: "pending" | "in_transit" | "delivered" | "cancelled"
  truckId?: string
  driverName?: string
  revenue: number
  distance: number
  pickupDate: string
  deliveryDate: string
}

export interface FinancialData {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  monthlyRevenue: { month: string; revenue: number; expenses: number }[]
}

export const mockTrucks: Truck[] = [
  {
    id: "1",
    number: "TRK-001",
    make: "Freightliner",
    model: "Cascadia",
    year: 2022,
    status: "active",
    driver: "John Smith",
    location: "Dallas, TX",
    mileage: 125000,
    nextMaintenance: "2024-02-15",
  },
  {
    id: "2",
    number: "TRK-002",
    make: "Peterbilt",
    model: "579",
    year: 2021,
    status: "maintenance",
    location: "Houston, TX",
    mileage: 180000,
    nextMaintenance: "2024-01-20",
  },
  {
    id: "3",
    number: "TRK-003",
    make: "Kenworth",
    model: "T680",
    year: 2023,
    status: "active",
    driver: "Mike Johnson",
    location: "Phoenix, AZ",
    mileage: 95000,
    nextMaintenance: "2024-03-10",
  },
  {
    id: "4",
    number: "TRK-004",
    make: "Volvo",
    model: "VNL",
    year: 2020,
    status: "idle",
    location: "Denver, CO",
    mileage: 220000,
    nextMaintenance: "2024-01-25",
  },
]

export const mockLoads: Load[] = [
  {
    id: "1",
    loadNumber: "LD-2024-001",
    origin: "Dallas, TX",
    destination: "Los Angeles, CA",
    status: "in_transit",
    truckId: "1",
    driverName: "John Smith",
    revenue: 3500,
    distance: 1435,
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-17",
  },
  {
    id: "2",
    loadNumber: "LD-2024-002",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    status: "pending",
    revenue: 2800,
    distance: 1377,
    pickupDate: "2024-01-18",
    deliveryDate: "2024-01-20",
  },
  {
    id: "3",
    loadNumber: "LD-2024-003",
    origin: "Seattle, WA",
    destination: "New York, NY",
    status: "delivered",
    truckId: "3",
    driverName: "Mike Johnson",
    revenue: 4200,
    distance: 2852,
    pickupDate: "2024-01-10",
    deliveryDate: "2024-01-14",
  },
]

export const mockFinancialData: FinancialData = {
  totalRevenue: 125000,
  totalExpenses: 89000,
  netProfit: 36000,
  monthlyRevenue: [
    { month: "Jul", revenue: 18000, expenses: 12000 },
    { month: "Aug", revenue: 22000, expenses: 15000 },
    { month: "Sep", revenue: 19000, expenses: 13500 },
    { month: "Oct", revenue: 25000, expenses: 17000 },
    { month: "Nov", revenue: 21000, expenses: 14500 },
    { month: "Dec", revenue: 20000, expenses: 17000 },
  ],
}
