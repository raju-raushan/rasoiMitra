import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

const inventoryItems = [
  {
    name: 'Milk',
    quantity: '1 Gallon',
    category: 'Dairy',
    addedDate: '2024-07-20',
    expiryDate: '2024-07-28',
    remainingDays: 8,
  },
  {
    name: 'Eggs',
    quantity: '12',
    category: 'Dairy',
    addedDate: '2024-07-20',
    expiryDate: '2024-08-10',
    remainingDays: 21,
  },
   {
    name: 'Bread',
    quantity: '1 Loaf',
    category: 'Bakery',
    addedDate: '2024-07-22',
    expiryDate: '2024-07-27',
    remainingDays: 5,
  },
  {
    name: 'Chicken Breast',
    quantity: '2 lbs',
    category: 'Meat',
    addedDate: '2024-07-22',
    expiryDate: '2024-07-26',
    remainingDays: 4,
  }
];

export default function InventoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">Remaining Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.addedDate}</TableCell>
                <TableCell>{item.expiryDate}</TableCell>
                <TableCell className="text-right">{item.remainingDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
