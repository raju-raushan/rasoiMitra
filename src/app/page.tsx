import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';
import { Camera, Lightbulb, ClipboardList, Moon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">SmartFridge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/detect" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Generate Recipe
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            History
          </Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Account
          </Link>
        </nav>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
            </Button>
            <Button asChild className="md:hidden">
              <Link href="/detect">Get Recipe</Link>
            </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
            <div className="bg-muted p-8 md:p-16 rounded-xl">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    Unlock Your Fridge's Potential.
                </h1>
                <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl mb-8">
                    Never wonder what to cook again. Get instant recipes from the
                    ingredients you already have.
                </p>
                <Button asChild size="lg">
                    <Link href="/detect">Get Recipe</Link>
                </Button>
            </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden">
                <Image
                    src="https://picsum.photos/seed/groceries/600/500"
                    alt="Groceries in a paper bag"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    data-ai-hint="fresh groceries"
                />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Fighting Food Waste, One Recipe at a Time.
              </h2>
              <p className="text-muted-foreground">
                Our mission is to make home cooking easier and more sustainable. By helping you use the ingredients you already have, we aim to reduce food waste and inspire creativity in the kitchen, one delicious meal at a time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-2">
                Discover the simple steps to transform your fridge's contents into amazing meals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <CardContent className="p-0 flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Snap & Scan</h3>
                    <p className="text-muted-foreground">
                    Upload a photo of your fridge, and our AI will automatically detect all your ingredients in seconds.
                    </p>
                </CardContent>
              </Card>
              <Card className="p-8 text-center">
                <CardContent className="p-0 flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Recipes</h3>
                    <p className="text-muted-foreground">
                    Receive personalized recipe recommendations based on your available ingredients and dietary preferences.
                    </p>
                </CardContent>
              </Card>
              <Card className="p-8 text-center">
                <CardContent className="p-0 flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <ClipboardList className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Track Your Stock</h3>
                    <p className="text-muted-foreground">
                    Manually add or remove items to keep a real-time inventory of what's in your fridge.
                    </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
                 <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="text-lg font-bold">SmartFridge</span>
                </Link>
                <p className="text-sm text-muted-foreground">Reducing food waste, one recipe at a time.</p>
            </div>
            <div className="md:col-start-3 flex flex-col gap-2">
                <h4 className="font-semibold">LINKS</h4>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
            </div>
             <div>
                <h4 className="font-semibold">LEGAL</h4>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t">
            <p className="text-sm text-muted-foreground text-center">© 2024 SmartFridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
