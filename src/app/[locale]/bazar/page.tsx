"use client";

import { Badge, Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import type { Listing } from "@/db/schemas";
import { Link } from "@/i18n/navigation";

// Texty a barvy pro stavy inzerátu
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

export default function Page() {
  const [listings, setListings] = useState<Listing[]>([]);

  // Načti všechny inzeráty z API
  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => setListings([]));
  }, []);

  return (
    <Container size="lg" mt={60} mb={60}>
      <Stack gap="xl">
        {/* Seznam inzerátů */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {listings.map((item) => (
            <Card key={item.id} shadow="sm" padding="lg" radius="xl" withBorder>
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
      </Stack>
    </Container>
  );
}
