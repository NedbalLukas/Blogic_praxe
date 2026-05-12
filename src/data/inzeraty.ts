export type Inzerat = {
  id: number;
  nazev: string;
  popis: string;
  cena: number | null; // null = zdarma
  kategorie: string;
  stav: "Dostupné" | "Rezervováno" | "Prodáno";
  kontakt: string;
};

export let inzeraty: Inzerat[] = [
  {
    id: 1,
    nazev: "Dětská jídelní židle",
    popis: "Modrá dětská jídelní židle, lehce použitá, výška nastavitelná.",
    cena: 300,
    kategorie: "Dětské věci",
    stav: "Dostupné",
    kontakt: "jana@example.com",
  },
  {
    id: 2,
    nazev: "Monitor 24 palců",
    popis: "Full HD monitor, funguje skvěle, dávám zdarma.",
    cena: null,
    kategorie: "Elektronika",
    stav: "Dostupné",
    kontakt: "petr@example.com",
  },
  {
    id: 3,
    nazev: "Krabice knih",
    popis: "Přibližně 20 knih, různé žánry.",
    cena: null,
    kategorie: "Knihy",
    stav: "Dostupné",
    kontakt: "marie@example.com",
  },
  {
    id: 4,
    nazev: "Konferenční stolek",
    popis: "Dřevěný stolek, menší škrábance, jinak v pořádku.",
    cena: 500,
    kategorie: "Nábytek",
    stav: "Rezervováno",
    kontakt: "tomas@example.com",
  },
  {
    id: 5,
    nazev: "Zimní bunda vel. M",
    popis: "Černá zimní bunda, nošená jednu sezónu.",
    cena: 200,
    kategorie: "Oblečení",
    stav: "Dostupné",
    kontakt: "lucie@example.com",
  },
];