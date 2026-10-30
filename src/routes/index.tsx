import { createFileRoute } from "@tanstack/react-router";
import { RuleSyncApp } from "@/components/rulesync/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RuleSyncApp />;
}
