"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconCash, IconCheck, IconMail, IconTag } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { Listing } from "@/db/schemas";
import { Link, useRouter } from "@/i18n/navigation";

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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<Listing | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      console.log("id:", id);
      fetch(`/api/listings/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setItem(data);
          setStatus(data.status);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    });
  }, [params]);

  const handleStatusChange = async (newStatus: string | null) => {
    if (!newStatus || !item) return;

    const res = await fetch(`/api/listings/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setStatus(newStatus);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) {
    return (
      <Container size="md" mt={60}>
        <Text c="dimmed">Načítání...</Text>
      </Container>
    );
  }

  if (error || !item) {
    return (
      <Container size="md" mt={60}>
        <Alert color="red" icon={<IconAlertCircle />} title="Chyba">
          Inzerát nebyl nalezen.
        </Alert>
        <Button component={Link} href="/bazar" mt="md" color="#FF5500">
          Zpět na bazar
        </Button>
      </Container>
    );
  }

  return (
    <Container size="md" mt={60} mb={60}>
      <Stack gap="xl">
        <Button component={Link} href="/bazar" variant="subtle" color="gray" w="fit-content">
          ← Zpět na bazar
        </Button>

        <Card shadow="sm" padding="xl" radius="xl" withBorder>
          <Stack gap="lg">
            <Group justify="space-between">
              <Badge color={STATUS_COLOR[status]} variant="light" size="lg">
                {STATUS_LABEL[status]}
              </Badge>
              <Badge color="orange" variant="outline" size="lg">
                {item.category}
              </Badge>
            </Group>

            <Stack gap={4}>
              <Title order={1} fw={800}>
                {item.title}
              </Title>
              <Text fw={700} size="xl" c="#FF5500">
                {item.isFree ? "Zdarma" : `${item.price} Kč`}
              </Text>
            </Stack>

            <Divider />

            <Stack gap={4}>
              <Text fw={500} size="sm" c="dimmed">
                POPIS
              </Text>
              <Text size="md" lh={1.8}>
                {item.description}
              </Text>
            </Stack>

            <Divider />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Card withBorder radius="md" padding="md">
                <Group gap="sm">
                  <ThemeIcon color="orange" variant="light" size={40} radius="md">
                    <IconMail size={20} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      Kontakt
                    </Text>
                    <Text fw={500}>{item.contact}</Text>
                  </Stack>
                </Group>
              </Card>

              <Card withBorder radius="md" padding="md">
                <Group gap="sm">
                  <ThemeIcon color="orange" variant="light" size={40} radius="md">
                    <IconTag size={20} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      Kategorie
                    </Text>
                    <Text fw={500}>{item.category}</Text>
                  </Stack>
                </Group>
              </Card>

              <Card withBorder radius="md" padding="md">
                <Group gap="sm">
                  <ThemeIcon color="orange" variant="light" size={40} radius="md">
                    <IconCash size={20} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      Cena
                    </Text>
                    <Text fw={500} c="#FF5500">
                      {item.isFree ? "Zdarma" : `${item.price} Kč`}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </SimpleGrid>

            <Divider />

            <Stack gap="xs">
              <Text fw={500}>Změnit stav inzerátu</Text>
              <Select
                value={status}
                onChange={handleStatusChange}
                radius="md"
                size="md"
                data={[
                  { value: "available", label: "Dostupné" },
                  { value: "reserved", label: "Rezervováno" },
                  { value: "sold", label: "Prodáno" },
                ]}
              />
              {saved && (
                <Alert color="green" icon={<IconCheck size={16} />}>
                  Stav byl úspěšně uložen.
                </Alert>
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
