import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { demoImpulseLogs } from "@/lib/demo-data";
import { DECISION_COLORS } from "@/lib/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapImpulseLog } from "@/lib/mappers";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ImpulseDetailPage({ params }: Props) {
  const { id } = await params;
  let log = demoImpulseLogs.find((entry) => entry.id === id);

  const hasSupabaseEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (hasSupabaseEnv) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data } = await supabase
        .from("impulse_logs")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (data) {
        log = mapImpulseLog(data);
      }
    } catch (error) {
      console.warn("Supabase not configured, falling back to demo data", error);
    }
  }

  if (!log) {
    return notFound();
  }

  return (
    <AppShell title={log.itemName} subtitle="Impulse log" hideNav>
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-white">
        <div className="flex flex-col gap-2 text-lg">
          <p className="text-sm text-slate-400">Category</p>
          <p className="text-xl font-semibold capitalize">{log.category}</p>
        </div>
        <div className="mt-4 flex gap-6 text-xl">
          <div>
            <p className="text-sm text-slate-400">Decision</p>
            <p className={`font-semibold uppercase ${DECISION_COLORS[log.decision]}`}>{log.decision}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Price</p>
            <p className="font-semibold">${log.itemPrice}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm text-slate-400">Questions answered</p>
          <div className="mt-3 space-y-2 text-sm">
            {Object.entries(log.questionsAnswered).map(([question, answer]) => (
              <div key={question} className="flex items-center justify-between rounded-2xl border border-white/5 px-3 py-2">
                <span className="capitalize text-slate-300">{question}</span>
                <span className="font-semibold text-white">{answer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
