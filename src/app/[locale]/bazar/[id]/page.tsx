"use client";

import {Alert,Badge,Button,Card,Container,Divider,Group,Modal,Select,SimpleGrid,Stack,Text,ThemeIcon,Title,} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconCash, IconCheck, IconMail, IconTag, IconTrash } from "@tabler/icons-react";
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
  const [item, setItem] = useState<Listing | null>(null);
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/listings/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setItem(data);
          setStatus(data.status);
        })
        .catch(() => setError(true));
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

  const handleDelete = async () => {
    if (!item) return;
    setDeleting(true);

    const res = await fetch(`/api/listings/${item.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/bazar");
    } else {
      setDeleting(false);
      closeDelete();
    }
  };

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
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title={
          <Group gap="xs">
            <IconTrash size={20} color="red" />
            <Text fw={700}>Smazat inzerát</Text>
          </Group>
        }
        centered
        radius="lg"
      >
        <Stack gap="md">
          <Text size="sm">
            Opravdu chcete smazat inzerát{" "}
            <Text component="span" fw={700}>
              „{item.title}"
            </Text>
            ? Tato akce je nevratná.
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="default" radius="md" onClick={closeDelete} disabled={deleting}>
              Zrušit
            </Button>
            <Button
              color="red"
              radius="md"
              leftSection={<IconTrash size={16} />}
              loading={deleting}
              onClick={handleDelete}
            >
              Smazat inzerát
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Button component={Link} href="/bazar" variant="subtle" color="gray" w="fit-content">
            ← Zpět na bazar
          </Button>

          <Group gap="sm" align="center">
            <Select
              value={status}
              onChange={handleStatusChange}
              radius="md"
              size="sm"
              w={160}
              data={[
                { value: "available", label: "Dostupné" },
                { value: "reserved", label: "Rezervováno" },
                { value: "sold", label: "Prodáno" },
              ]}
            />
            <Button
              color="red"
              variant="light"
              radius="md"
              size="sm"
              leftSection={<IconTrash size={16} />}
              onClick={openDelete}
            >
              Smazat
            </Button>
          </Group>
        </Group>

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
                    <Text fw={500}>{item.isFree ? "Zdarma" : `${item.price} Kč`}</Text>
                  </Stack>
                </Group>
              </Card>
            </SimpleGrid>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
