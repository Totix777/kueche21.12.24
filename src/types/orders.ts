export interface OrderItem {
  articleNumber: string;
  name: string;
  unit: string;
  packageSize: string;
  orderUnit: 'Karton' | 'Gebinde' | 'Stück' | 'Kanister' | 'Dose' | 'Flasche' | 'Eimer';
  quantity?: number;
}

export interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  status: 'draft' | 'submitted' | 'completed';
}