import { Button, Card, Container, Image, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconGift, IconSearch, IconShoppingBag } from "@tabler/icons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogic Bazar",
  description: "Interní bazar pro spolupracovníky",
};

export default async function Page(_: PageProps<"/[locale]">) {
  return (
    <Container size="lg" mt={80}>
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim {
          opacity: 0;
          animation: pageIn 0.6s ease forwards;
        }
        .anim-1 { animation-delay: 0.3s; }
        .anim-2 { animation-delay: 0.5s; }
        .anim-3 { animation-delay: 0.7s; }
        .anim-4 { animation-delay: 0.9s; }
      `}</style>

      <Stack gap={80} align="center">
        {/* Hero */}
        <Stack gap="lg" align="center" className="anim anim-1">
          <Title order={1} size={64} ta="center" fw={800}>
            <span style={{ color: "#FF5500" }}>Blogic</span> Bazar
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={650} lh={1.7}>
            Interní bazar pro spolupracovníky Blogic. Nabídni techniku, elektroniku nebo jiné věci, které už nevyužiješ.
          </Text>
          <Button component="a" href="/bazar" size="xl" color="#FF5500" radius="md">
            Přejít do Bazaru
          </Button>
        </Stack>

        {/* Tři karty */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" w="100%">
          <Card shadow="sm" padding="xl" radius="xl" withBorder className="anim anim-2">
            <Stack gap="md">
              <ThemeIcon size={56} radius="xl" color="orange" variant="light">
                <IconShoppingBag size={28} />
              </ThemeIcon>
              <Stack gap={4}>
                <Title order={4} size={30}>
                  Prodej věci
                </Title>
                <Text size="md" c="dimmed" lh={1.6}>
                  Nabídni elektroniku, příslušenství nebo jiné věci, které už nevyužiješ.
                </Text>
              </Stack>
            </Stack>
          </Card>

          <Card shadow="sm" padding="xl" radius="xl" withBorder className="anim anim-3">
            <Stack gap="md">
              <ThemeIcon size={56} radius="xl" color="orange" variant="light">
                <IconGift size={28} />
              </ThemeIcon>
              <Stack gap={4}>
                <Title order={4} size={30}>
                  Dej zdarma
                </Title>
                <Text size="md" c="dimmed" lh={1.6}>
                  Nepotřebné věci nemusí skončit v šuplíku. Daruj je kolegům zdarma.
                </Text>
              </Stack>
            </Stack>
          </Card>

          <Card shadow="sm" padding="xl" radius="xl" withBorder className="anim anim-4">
            <Stack gap="md">
              <ThemeIcon size={56} radius="xl" color="orange" variant="light">
                <IconSearch size={28} />
              </ThemeIcon>
              <Stack gap={4}>
                <Title order={4} size={30}>
                  Hledej
                </Title>
                <Text size="md" c="dimmed" lh={1.6}>
                  Projdi nabídky kolegů a najdi techniku, kterou právě hledáš.
                </Text>
              </Stack>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Foto sekce */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={60} w="100%" mt="xl" className="anim anim-4">
          <Image src="/photo2.png" alt="Blogic Bazar" radius="xl" />
          <Stack gap="lg" justify="center">
            <Title order={2} size={42}>
              Proč používat <span style={{ color: "#FF5500" }}>Blogic</span> Bazar?
            </Title>
            <Text c="dimmed" size="lg" lh={1.8}>
              Místo vyhazování věcí je nabídni kolegům. Ušetříš jim peníze a pomůžeš životnímu prostředí.
            </Text>
            <Text c="dimmed" size="lg" lh={1.8}>
              Vše probíhá interně — žádná registrace, žádné poplatky. Stačí přidat inzerát a domluvit se.
            </Text>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
