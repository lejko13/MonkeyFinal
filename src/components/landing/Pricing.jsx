import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Starter',
    price: 'od 990 €',
    description: 'Pre malé firmy a začínajúcich podnikateľov',
    features: [
      'Responzívny dizajn',
      'Do 5 podstránok',
      'Kontaktný formulár',
      'SEO základ',
      'SSL certifikát',
      'CMS na správu obsahu',
    ],
    popular: false,
  },
  {
    name: 'Business',
    price: 'od 2 490 €',
    description: 'Pre rastúce firmy s vyššími ambíciami',
    features: [
      'Všetko zo Starter',
      'Do 15 podstránok',
      'Pokročilé SEO',
      'Vlastné animácie',
      'Blog modul',
      'Analytika & reporting',
      'Prioritná podpora',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'od 4 990 €',
    description: 'Pre náročných klientov a e-commerce',
    features: [
      'Všetko z Business',
      'Neobmedzené stránky',
      'E-shop funkcionalita',
      'Platobná brána',
      'Pokročilé integrácie',
      'A/B testovanie',
      'Dedikovaný manažér',
      'SLA podpora 24/7',
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="cennik" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-medium tracking-widest uppercase">Cenník</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight">
            Transparentné <span className="text-primary">ceny</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg mt-4 max-w-2xl mx-auto">
            Vyberte si balík, ktorý najlepšie vyhovuje vašim potrebám. Každý projekt je unikátny — radi vám pripravíme aj individuálnu ponuku.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-primary/10 to-card border-primary/30 shadow-xl shadow-primary/5'
                  : 'bg-card border-border/50 hover:border-primary/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-heading font-semibold">
                  Najobľúbenejší
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{pkg.description}</p>
                <div className="mt-6">
                  <span className="font-heading text-4xl font-bold text-foreground">{pkg.price}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#kontakt">
                <Button
                  className={`w-full rounded-full font-heading font-medium h-12 ${
                    pkg.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Nezáväzná ponuka
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}