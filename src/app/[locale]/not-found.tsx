import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="type-label-sm text-chestnut">404</p>
      <h1 className="type-headline-lg max-w-2xl">{t("title")}</h1>
      <p className="max-w-xl text-muted">{t("description")}</p>
      <ButtonLink href="/">{t("action")}</ButtonLink>
    </Container>
  );
}
