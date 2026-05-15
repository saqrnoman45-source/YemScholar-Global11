import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Path to Academic Excellence
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover curated courses, apply for scholarships, and explore groundbreaking research.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/courses">
                  <Button size="lg">Explore Courses</Button>
                </Link>
                <Link href="/scholarships">
                  <Button variant="outline" size="lg">Find Scholarships</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
