'use client';

import { motion } from 'framer-motion';
import { Camera, CheckCircle, ChevronRight, Gift, MessageCircle, Play, Star, Users } from 'lucide-react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { handphoneView, laptopView, tabletView } from '~/assets';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { navigationGuest } from '../navigation';

export function PageLanding() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Digital Invitations',
      description: 'Send beautiful digital invitations with integrated AI chatbots that answer guest questions instantly and collect RSVPs automatically.',
    },
    {
      icon: Users,
      title: 'Smart Guest Management',
      description: 'Track attendance, meal preferences, and special requirements with our intuitive guest management system.',
    },
    {
      icon: Camera,
      title: 'Photo Gallery Platform',
      description: 'Share wedding moments instantly with a beautiful, organized gallery that guests can access and contribute to.',
    },
    {
      icon: Gift,
      title: 'Inventory Management',
      description: 'Keep track of food, souvenirs, and other wedding essentials with our comprehensive inventory system.',
    },
  ];

  const packages = [
    {
      name: 'Essential',
      price: '$299',
      description: 'Perfect for intimate weddings',
      features: ['Digital invitations for up to 100 guests', 'Basic RSVP management', 'Photo gallery (500 photos)', 'Email support'],
    },
    {
      name: 'Premium',
      price: '$599',
      popular: true,
      description: 'Our most popular package',
      features: [
        'Digital invitations for up to 250 guests',
        'Advanced RSVP with AI chatbot',
        'Unlimited photo gallery',
        'Guest attendance tracking',
        'Basic inventory management',
        'Priority support',
      ],
    },
    {
      name: 'Platinum',
      price: '$999',
      description: 'For the ultimate wedding experience',
      features: [
        'Everything in Premium',
        'Unlimited guests',
        'Advanced inventory with analytics',
        'Dedicated wedding consultant',
        'Custom domain',
        '24/7 premium support',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael',
      content:
        "WedWise made our wedding planning so stress-free! The AI chatbot answered all our guests' questions, and the RSVP system was incredibly efficient.",
      rating: 5,
    },
    {
      name: 'Jessica & David',
      content:
        'The photo gallery feature was a hit with our guests! Everyone could upload and share photos instantly. It felt like our wedding continued for weeks after the event.',
      rating: 5,
    },
    {
      name: 'Elena & Brian',
      content:
        "As wedding organizers, we've integrated WedWise into all our packages. The inventory system alone has saved us countless hours of manual tracking.",
      rating: 5,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar navigation={navigationGuest} />

      <section className="relative overflow-hidden py-24 lg:py-32 bg-[--color-background]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left content */}
            <motion.div
              className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Your Perfect Wedding, <span className="text-primary">Perfectly Organized</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                WedWise brings all your wedding needs into one seamless platform - from digital invitations to guest management, photos, and inventory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => alert('Coming soon!')}
                  className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  Start Planning <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button type="button" variant="outline" size="lg" className="cursor-pointer border-border text-foreground hover:bg-accent px-8">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>
            </motion.div>

            <div ref={ref} className="relative flex justify-center items-center mt-12 scale-75">
              {/* Laptop Center */}
              <motion.div
                key={inView ? 'laptop-in' : 'laptop-out'}
                className="w-[600px]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image src={laptopView} alt="Laptop preview" width={1200} height={800} className="rounded-md" />
              </motion.div>

              {/* Tablet Left */}
              <motion.div
                key={inView ? 'tablet-in' : 'tablet-out'}
                className="absolute -left-40 bottom-0 w-[350px]"
                initial={{ opacity: 0, x: -80, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
              >
                <Image src={tabletView} alt="Tablet preview" width={800} height={600} className="rounded-md" />
              </motion.div>

              {/* Mobile Right */}
              <motion.div
                key={inView ? 'mobile-in' : 'mobile-out'}
                className="absolute -right-24 bottom-0 w-[220px]"
                initial={{ opacity: 0, x: 80, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
              >
                <Image src={handphoneView} alt="Mobile preview" width={400} height={800} className="rounded-md" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our integrated platform takes care of all your wedding planning needs with modern, practical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="h-full border-border hover:border-primary transition-colors text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Designed With Wedding Experts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Developed in collaboration with professional wedding organizers to ensure every feature meets real-world needs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <motion.div
                key={inView ? 'preview-in' : 'preview-out'}
                className="w-[600px]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image src={laptopView} alt="Laptop preview" width={550} height={400} className="rounded-xl shadow-lg" />
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Choose Your Package</h3>
                    <p className="text-muted-foreground">Select from our modular packages that fit your wedding size and needs.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Customize Your Setup</h3>
                    <p className="text-muted-foreground">Personalize your digital invitations, RSVP forms, and photo gallery.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Enjoy Your Big Day</h3>
                    <p className="text-muted-foreground">Relax and enjoy your wedding while we handle the organization details.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Flexible Packages for Every Wedding</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our modular approach lets you choose only what you need, with bundling options to save money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative ${pkg.popular ? 'border-2 border-primary rounded-xl' : 'border border-border rounded-xl'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}

                <Card className="border-0 h-full">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl text-foreground">{pkg.name}</CardTitle>
                    <div className="my-4">
                      <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                    </div>
                    <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => alert('clicked')}
                      className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Love Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from couples and wedding organizers who have used WedWise to create unforgettable weddings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-muted-foreground italic mb-6">"{testimonial.content}"</blockquote>

                    <div className="text-foreground font-semibold">{testimonial.name}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Perfect Wedding?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of couples who have made their special day even more memorable with WedWise.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-background text-foreground hover:bg-accent px-8">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="bg-background text-foreground hover:bg-accent px-8">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}
