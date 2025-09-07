import type { FC } from "react";
import testimonials from "@/./data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal } from "lucide-react";

export interface Testimonial {
  name: string;
  initials: string;
  image?: string;
  role: string;
  content: string;
  featured?: boolean;
}

const Testimonials: FC = () => {
  const smallTestimonials = testimonials.filter((t) => !t.featured);
  const featuredTestimonial = testimonials.find((t) => t.featured);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Developers just like you
            <span className="block">are already using DevHub</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left Column - 2 testimonials */}
          <div className="lg:col-span-4 space-y-6">
            {smallTestimonials.slice(0, 2).map((t, idx) => (
              <TestimonialCard key={idx} testimonial={t} />
            ))}
          </div>

          {/* Middle Column - 2 testimonials */}
          <div className="lg:col-span-4 space-y-6">
            {smallTestimonials.slice(2, 4).map((t, idx) => (
              <TestimonialCard key={idx} testimonial={t} />
            ))}
          </div>

          {/* Right Column - Featured */}
          <div className="lg:col-span-4">
            {featuredTestimonial && <FeaturedTestimonial testimonial={featuredTestimonial} />}
          </div>
        </div>
      </div>

      {/* Floating testimonial element */}
      <div className="absolute top-20 left-10 hidden xl:block">
        <Card className="w-48 shadow-lg rotate-[-8deg] hover:rotate-0 transition-transform duration-300 bg-white border-border">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              "Finally found challenging projects that aren't just todo apps..."
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial }) => (
  <Card className="border-border shadow-sm">
    <CardContent className="p-6">
      <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
      <div className="flex items-center space-x-3">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
            {testimonial.initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

const FeaturedTestimonial: FC<FeaturedTestimonialProps> = ({ testimonial }) => (
  <Card className="border-border shadow-sm h-full">
    <CardContent className="p-6 h-full flex flex-col">
      <div className="flex-1">
        <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-semibold">
            {testimonial.initials}
          </div>
          <div>
            <p className="font-semibold text-sm">{testimonial.name}</p>
            <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-lg overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch success story
          </Button>
        </div>
        <div className="absolute bottom-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>LIVE</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
