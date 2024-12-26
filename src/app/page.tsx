import { Welcome } from "@/features/Welcome/Welcome";
import { Layout } from "@/layouts/Layout";

export default function WelcomePage() {
  return (
    <Layout.Main>
      <Welcome.Root />
    </Layout.Main>
  );
}
