import { Button, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
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

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 28px 32px;
          border-radius: 16px;
          border: 1px solid #e9ecef;
          background: #ffffff;
          border-left: 4px solid #FF5500;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,85,0,0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .feature-card:hover {
          box-shadow: 0 8px 32px rgba(255,85,0,0.10);
          transform: translateX(4px);
        }
        .feature-number {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          color: rgba(255,85,0,0.10);
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          letter-spacing: -4px;
          user-select: none;
        }
        .feature-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(255,85,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF5500;
        }
        .feature-body {
          flex: 1;
        }
        .feature-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #1a1a1a;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: #868e96;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 600px) {
          .feature-number {
            display: none;
          }
        }
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

        {/* Feature karty */}
        <Stack gap="md" w="100%" className="anim anim-2">
          {[
            {
              icon: <IconShoppingBag size={26} />,
              title: "Prodej věci",
              desc: "Nabídni elektroniku, příslušenství nebo jiné věci, které už nevyužiješ.",
              n: "01",
            },
            {
              icon: <IconGift size={26} />,
              title: "Dej zdarma",
              desc: "Nepotřebné věci nemusí skončit v šuplíku. Daruj je kolegům zdarma.",
              n: "02",
            },
            {
              icon: <IconSearch size={26} />,
              title: "Hledej",
              desc: "Projdi nabídky kolegů a najdi techniku, kterou právě hledáš.",
              n: "03",
            },
          ].map((item) => (
            <div key={item.n} className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <div className="feature-body">
                <p className="feature-title">{item.title}</p>
                <p className="feature-desc">{item.desc}</p>
              </div>
              <span className="feature-number">{item.n}</span>
            </div>
          ))}
        </Stack>

        {/* Foto sekce */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={60} w="100%" mt="xl" className="anim anim-4">
          <img src="/photo2.png" alt="Blogic Bazar" style={{ borderRadius: 20, width: "100%" }} />
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
