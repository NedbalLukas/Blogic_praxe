"use client";

import { Badge, Button, Card, Container, Divider, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import type { Listing } from "@/db/schemas";
import { Link } from "@/i18n/navigation";

const STATUS_LABEL: Record<string, string> = {
  available: "Dostupné",
  reserved: "Rezervováno",
  sold: "Prodáno",
};

const STATUS_COLOR: Record<string, string> = {
  available: "green",
  reserved: "yellow",
  sold: "red",
};

const CATEGORIES = ["Vše", "Nábytek", "Dětské věci", "Oblečení", "Elektronika", "Knihy", "Ostatní"];
const STATUSES = ["Vše", "available", "reserved", "sold"];
const STATUS_FILTER_LABEL: Record<string, string> = {
  Vše: "Vše",
  available: "Dostupné",
  reserved: "Rezervováno",
  sold: "Prodáno",
};
const STATUS_FILTER_COLOR: Record<string, string> = {
  Vše: "orange",
  available: "green",
  reserved: "yellow",
  sold: "red",
};

export default function Page() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeCategory, setActiveCategory] = useState("Vše");
  const [activeStatus, setActiveStatus] = useState("Vše");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => setListings([]));
  }, []);

  const filtered = listings.filter((item) => {
    const categoryMatch = activeCategory === "Vše" || item.category === activeCategory;
    const statusMatch = activeStatus === "Vše" || item.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <Container size="lg" mt={60} mb={60}>
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim {
          opacity: 0;
          animation: pageIn 0.5s ease forwards;
        }
        .anim-1 { animation-delay: 0.05s; }
        .anim-2 { animation-delay: 0.2s; }
        .anim-3 { animation-delay: 0.35s; }
      `}</style>

      <Stack gap="lg">
        {/* Filtr podle kategorie */}
        <Stack gap="xs" className="anim anim-1">
          <Text size="sm" c="dimmed" fw={500}>Kategorie</Text>
          <Group gap="sm" wrap="wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "filled" : "light"}
                color="orange"
                radius="xl"
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </Group>
        </Stack>

        <Divider className="anim anim-2" />

        {/* Seznam inzerátů */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filtered.map((item, index) => (
            <Card
              key={item.id}
              shadow="sm"
              padding="lg"
              radius="xl"
              withBorder
              style={{
                opacity: 0,
                animation: `cardIn 0.5s ease forwards`,
                animationDelay: `${0.35 + index * 0.07}s`,
              }}
            >
              <Stack gap="sm">
                <Group justify="space-between">
                  <Badge color={STATUS_COLOR[item.status]} variant="light">
                    {STATUS_LABEL[item.status]}
                  </Badge>
                  <Badge color="orange" variant="outline">
                    {item.category}
                  </Badge>
                </Group>

                <Title order={3} size="lg">
                  {item.title}
                </Title>

                <Text c="dimmed" size="sm" lineClamp={2}>
                  {item.description}
                </Text>

                <Group justify="space-between" align="center" mt="auto">
                  <Text fw={700} size="lg" c="#FF5500">
                    {item.isFree ? "Zdarma" : `${item.price} Kč`}
                  </Text>
                  <Button
                    component={Link}
                    href={`/bazar/${item.id}`}
                    variant="light"
                    color="orange"
                    radius="md"
                    size="sm"
                  >
                    Detail
                  </Button>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {filtered.length === 0 && (
          <Text ta="center" c="dimmed" mt="xl" className="anim anim-3">
            Žádné inzeráty odpovídající filtru.
          </Text>
        )}
      </Stack>
    </Container>
  );
}