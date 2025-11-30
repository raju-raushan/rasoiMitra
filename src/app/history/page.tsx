'use client';

import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

type HistoryItem = {
  id: string;
  action: string;
  details: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

export default function HistoryPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const historyQuery = useMemoFirebase(
    () => {
      if (!firestore || !user) return null;
      return query(
        collection(firestore, `users/${user.uid}/history`),
        orderBy('timestamp', 'desc')
      );
    },
    [firestore, user]
  );
  
  const { data: history, isLoading, error } = useCollection<HistoryItem>(historyQuery);

  const formatDate = (timestamp: HistoryItem['timestamp']) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp.seconds * 1000);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  const renderSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
            <TableCell><Skeleton className="h-4 w-64" /></TableCell>
            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Activity History</CardTitle>
      </CardHeader>
      <CardContent>
        {isUserLoading || isLoading ? (
          renderSkeleton()
        ) : error ? (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Could not load history. Please try again later.
                </AlertDescription>
            </Alert>
        ) : !user ? (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Logged In</AlertTitle>
                <AlertDescription>
                    You need to be logged in to view your history.
                </AlertDescription>
            </Alert>
        ) : history && history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.action}</TableCell>
                  <TableCell>{item.details}</TableCell>
                  <TableCell>{formatDate(item.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No History Found</AlertTitle>
                <AlertDescription>
                    You haven't performed any actions yet.
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
