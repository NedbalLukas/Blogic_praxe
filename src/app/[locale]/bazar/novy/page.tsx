"use client";

import {
  Button,
  Checkbox,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "@/i18n/navigation";

// Dostupné kategorie inzerátů
const CATEGORIES = ["Nábytek", "Dětské věci", "Oblečení", "Elektronika", "Knihy", "Ostatní"];

export default function Page() {
  const router = useRouter();

  // Formulář s počátečními hodnotami a validací
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      isFree: false,
      category: "",
      contact: "",
    },
    validate: {
      title: (v) => (v.trim().length === 0 ? "Název je povinný" : null),
      description: (v) => (v.trim().length === 0 ? "Popis je povinný" : null),
      category: (v) => (v.trim().length === 0 ? "Kategorie je povinná" : null),
      contact: (v) => (v.trim().length === 0 ? "Kontakt je povinný" : null),
      price: (v, values) => (!values.isFree && v <= 0 ? "Zadej cenu nebo označ jako zdarma" : null),
    },
  });

  // Odešli formulář do API a přesměruj na přehled
  const handleSubmit = async (values: typeof form.values) => {
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push("/bazar");
    }
  };

  return (
    <Container size="md" mt={60} mb={60}>
      <Stack gap="xl">
        <Stack gap={4}>
          <Title order={1} fw={800}>
            Nový <span style={{ color: "#FF5500" }}>inzerát</span>
          </Title>
          <Text c="dimmed" size="lg">
            Vyplň údaje o věci, kterou chceš prodat nebo darovat.
          </Text>
        </Stack>

        <Paper withBorder radius="xl" p="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <TextInput
                label="Název"
                placeholder="Např. MacBook Pro 2021"
                size="md"
                radius="md"
                required
                {...form.getInputProps("title")}
              />

              <Textarea
                label="Popis"
                placeholder="Popiš stav, vlastnosti nebo důvod prodeje..."
                size="md"
                radius="md"
                minRows={4}
                required
                {...form.getInputProps("description")}
              />

              <Select
                label="Kategorie"
                placeholder="Vyber kategorii"
                size="md"
                radius="md"
                required
                data={CATEGORIES}
                {...form.getInputProps("category")}
              />

              {/* Cena se zobrazí jen když není zdarma */}
              <NumberInput
                label="Cena (Kč)"
                placeholder="0"
                size="md"
                radius="md"
                min={0}
                disabled={form.values.isFree}
                {...form.getInputProps("price")}
              />

              <Switch
                color="#FF5500"
                label="Nabízím zdarma"
                size="md"
                {...form.getInputProps("isFree", { type: "checkbox" })}
              />

              <TextInput
                label="Kontakt"
                placeholder="Např. jan.novak@blogic.cz"
                size="md"
                radius="md"
                required
                {...form.getInputProps("contact")}
              />

              <Group justify="flex-end">
                <Button variant="subtle" color="gray" size="md" radius="md" onClick={() => router.push("/bazar")}>
                  Zrušit
                </Button>
                <Button type="submit" color="#FF5500" size="md" radius="md">
                  Zveřejnit inzerát
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
