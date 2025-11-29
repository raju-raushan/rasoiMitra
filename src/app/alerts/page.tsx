import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BellRing } from 'lucide-react';

const expiringItems = [
    {
        name: 'Chicken Breast',
        expiryDate: '2024-07-26',
        remainingDays: 4,
    },
    {
        name: 'Bread',
        expiryDate: '2024-07-27',
        remainingDays: 5,
    },
    {
        name: 'Milk',
        expiryDate: '2024-07-28',
        remainingDays: 8,
    }
];

export default function ExpiryAlertsPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing />
            Expiry Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {expiringItems.map(item => (
                 <div key={item.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Expires on: {item.expiryDate}</p>
                    </div>
                    <Badge variant={item.remainingDays < 5 ? "destructive" : "secondary"}>
                        {item.remainingDays} days left
                    </Badge>
                 </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked/>
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
