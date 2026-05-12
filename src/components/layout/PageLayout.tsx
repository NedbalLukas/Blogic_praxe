"use client";

import {
  AppShell,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  Divider,
  Anchor
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PropsWithChildren } from "react";
import { PageLogo } from "@/components/layout/PageLogo";
import { Link } from "@/i18n/navigation";

const HEADER_HEIGHT = 90;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md" withBorder={false}>

      <Drawer opened={opened} onClose={close} title="Navigace" size="xs">
        <Stack gap="sm">
          <Button
            component={Link}
            href="/"
            variant="subtle"
            color="#FF5500"
            onClick={close}
            fullWidth
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
          >
            Bazar
          </Button>

          <Button
            component={Link}
            href="/bazar/novy"
            color="#FF5500"
            onClick={close}
            fullWidth
          >
            + Nový inzerát
          </Button>
        </Stack>
      </Drawer>

      {/* Header */}
      <AppShell.Header px="md">
        <Container size={BODY_MAX_WIDTH} h="100%">
          <Group h="100%" align="center" justify="space-between">
            <PageLogo />

            <Group gap="sm" visibleFrom="sm">
              <Button
                component={Link}
                href="/"
                color="#FF5500"
                variant="subtle"
              >
                Domů
              </Button>

              <Button
                component={Link}
                href="/bazar"
                color="#FF5500"
                variant="subtle"
              >
                Bazar
              </Button>

              <Button
                component={Link}
                href="/bazar/novy"
                color="#FF5500"
              >
                + Nový inzerát
              </Button>
            </Group>

            <Burger opened={opened} onClick={open} hiddenFrom="sm" />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Body */}
      <AppShell.Main>
        <Container size={BODY_MAX_WIDTH} px="md">
          {children}
        </Container>

        <Container size={BODY_MAX_WIDTH} px="md" mt="xl">
          <Divider mb="xl" />

          <Group justify="space-between" align="flex-start" pb="xl" wrap="wrap" gap="xl">

            <Stack gap="xs" maw={300}>
              <PageLogo />
              <Text size="sm" c="dimmed" mt="xs">
                Interní bazar pro spolupracovníky Blogic.
                Nabídni věci k prodeji nebo k přenechání zdarma.
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={500} mb="xs">Navigace</Text>

              <Anchor component={Link} href="/" c="dimmed" size="sm">
                Domů
              </Anchor>

              <Anchor component={Link} href="/bazar" c="dimmed" size="sm">
                Bazar
              </Anchor>

              <Anchor component={Link} href="/bazar/novy" c="dimmed" size="sm">
                Nový inzerát
              </Anchor>
            </Stack>

            <Stack gap="xs">
              <Text fw={500} mb="xs">Kontakt</Text>
              <Text size="sm" c="dimmed">Blogic s.r.o.</Text>
              <Anchor href="mailto:info@blogic.cz" c="dimmed" size="sm">
                info@blogic.cz
              </Anchor>
            </Stack>

          </Group>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}