'use client';

import { AppHeader } from '@/components/fridge-chef/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Scan } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>About The App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fridge Chef is your smart kitchen assistant. It helps you keep track
            of your fridge inventory, suggests recipes based on what you have,
            and alerts you about expiring items.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Features</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-semibold">Ingredient Detection</h3>
            <p className="text-sm text-muted-foreground">
              Use your camera to automatically detect items in your fridge.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-semibold">Inventory Management</h3>
            <p className="text-sm text-muted-foreground">
              Keep a detailed list of your items, including quantity and expiry dates.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-semibold">Recipe Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Get creative recipe ideas based on the ingredients you already have.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <h3 className="font-semibold">Expiry Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Receive notifications for items that are about to expire.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/detect">
            <Scan className="mr-2 h-4 w-4" />
            Scan Fridge & Get Recipes
          </Link>
        </Button>
      </div>

       <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Items Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total items in inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Never</p>
            <p className="text-sm text-muted-foreground">Inventory last synced</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
