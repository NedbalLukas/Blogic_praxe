"use client";

import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import type { PropsWithChildren } from "react";
import { PageLogo } from "@/components/layout/PageLogo";
import { Link } from "@/i18n/navigation";

const HEADER_HEIGHT = 70;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();

  const isScrolled = scroll.y > 10;

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      padding="md"
      withBorder={false}
    >
      {/* Mobilní menu */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} size="lg" c="#FF5500">
            Menu
          </Text>
        }
        size="xs"
        styles={{
          header: { borderBottom: "1px solid #f0f0f0", paddingBottom: 12 },
        }}
      >
        <Stack gap="xs" mt="md">
          <Button
            component={Link}
            href="/"
            variant="subtle"
            color="#FF5500"
            onClick={close}
            fullWidth
            justify="flex-start"
            size="md"
          >
            Domů
          </Button>
          <Button
            component={Link}
            href="/bazar"
            variant="subtle"
            color="#FF5500"
            onClick={close}
            fullWidth
            justify="flex-start"
            size="md"
          >
            Bazar
          </Button>
          <Divider my="sm" />
          <Button
            component={Link}
            href="/bazar/novy"
            color="#FF5500"
            onClick={close}
            fullWidth
            size="md"
            radius="md"
          >
            + Nový inzerát
          </Button>
        </Stack>
      </Drawer>

      {/* Hlavička */}
      <AppShell.Header
        px="md"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(255, 255, 255, 1)",
          boxShadow: isScrolled
            ? "0 1px 20px rgba(0,0,0,0.08)"
            : "0 1px 0 #f0f0f0",
          transition: "box-shadow 0.25s ease, background-color 0.25s ease",
        }}
      >
        <Container size={BODY_MAX_WIDTH} h="100%">
          <Group h="100%" align="center" justify="space-between">
            <PageLogo />

            {/* Desktopové menu */}
            <Group gap={4} visibleFrom="sm">
              <Button
                component={Link}
                href="/"
                color="gray"
                variant="subtle"
                size="sm"
                styles={{ root: { fontWeight: 500 } }}
              >
                Domů
              </Button>
              <Button
                component={Link}
                href="/bazar"
                color="gray"
                variant="subtle"
                size="sm"
                styles={{ root: { fontWeight: 500 } }}
              >
                Bazar
              </Button>
              <Box w={8} />
              <Button
                component={Link}
                href="/bazar/novy"
                color="#FF5500"
                size="sm"
                radius="md"
                styles={{ root: { fontWeight: 600 } }}
              >
                + Nový inzerát
              </Button>
            </Group>

            <Burger
              opened={opened}
              onClick={open}
              hiddenFrom="sm"
              color="#FF5500"
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Obsah stránky */}
      <AppShell.Main>
        <Container size={BODY_MAX_WIDTH} px="md">
          {children}
        </Container>

        {/* Patička */}
        <Box bg="#fafafa" mt="xl" style={{ borderTop: "1px solid #f0f0f0" }}>
          <Container size={BODY_MAX_WIDTH} px="md">
            <Group
              justify="space-between"
              align="flex-start"
              py="xl"
              wrap="wrap"
              gap="xl"
            >
              <Stack gap="xs" maw={300}>
                <PageLogo />
                <Text size="sm" c="dimmed" mt="xs" lh={1.6}>
                  Interní bazar pro spolupracovníky Blogic. Nabídni věci
                  k prodeji nebo k přenechání zdarma.
                </Text>
              </Stack>

              <Stack gap={6}>
                <Text fw={600} size="sm" mb="xs" tt="uppercase" c="#FF5500" style={{ letterSpacing: "0.05em" }}>
                  Navigace
                </Text>
                <Anchor component={Link} href="/" c="dimmed" size="sm" underline="hover">
                  Domů
                </Anchor>
                <Anchor component={Link} href="/bazar" c="dimmed" size="sm" underline="hover">
                  Bazar
                </Anchor>
                <Anchor component={Link} href="/bazar/novy" c="dimmed" size="sm" underline="hover">
                  Nový inzerát
                </Anchor>
              </Stack>

              <Stack gap={6}>
                <Text fw={600} size="sm" mb="xs" tt="uppercase" c="#FF5500" style={{ letterSpacing: "0.05em" }}>
                  Kontakt
                </Text>
                <Text size="sm" c="dimmed">
                  Blogic s.r.o.
                </Text>
                <Anchor href="mailto:info@blogic.cz" c="dimmed" size="sm" underline="hover">
                  info@blogic.cz
                </Anchor>
              </Stack>
            </Group>

            <Divider />
            <Text size="xs" c="dimmed" ta="center" py="md">
              © {new Date().getFullYear()} Blogic s.r.o. Všechna práva vyhrazena.
            </Text>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}