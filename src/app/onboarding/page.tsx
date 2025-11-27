"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

const schema = z.object({
  age: z.string(),
  incomeType: z.string(),
  monthlyIncome: z.string(),
  monthlyExpenses: z.string(),
  city: z.string(),
  cityTier: z.string(),
});

type OnboardingValues = z.infer<typeof schema>;

const steps = [
  { title: "Basics", description: "Age + city" },
  { title: "Money vibe", description: "Income & expenses" },
  { title: "Finish", description: "Review" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: "24",
      incomeType: "salary",
      monthlyIncome: "3000",
      monthlyExpenses: "2000",
      city: "Mumbai",
      cityTier: "tier1",
    },
  });

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (values: OnboardingValues) => {
    console.log("Onboarded", values);
    next();
  };

  return (
    <AppShell title="Onboarding" subtitle="3 quick steps" hideNav>
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-4">
          {steps.map((s, index) => (
            <div key={s.title} className="flex-1 text-center">
              <div className={`mx-auto h-10 w-10 rounded-full border-2 ${index <= step ? "border-emerald-300 bg-emerald-500/20" : "border-white/10"}`}></div>
              <p className="mt-2 text-sm text-white">{s.title}</p>
              <p className="text-xs text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-300">Age</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="mt-1 bg-slate-950/30 text-white">
                          <SelectValue placeholder="Age" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[...Array(13)].map((_, idx) => (
                          <SelectItem key={idx} value={`${16 + idx}`}>
                            {16 + idx}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incomeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-300">Income type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="mt-1 bg-slate-950/30 text-white">
                          <SelectValue placeholder="Income type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pocket_money">Pocket money</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-sm text-slate-300">City</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-1 bg-slate-950/30 text-white" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-300">City tier</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="mt-1 bg-slate-950/30 text-white">
                          <SelectValue placeholder="Tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tier1">Tier 1</SelectItem>
                        <SelectItem value="tier2">Tier 2</SelectItem>
                        <SelectItem value="tier3">Tier 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-300">Monthly income</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-1 bg-slate-950/30 text-white" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-300">Monthly expenses</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-1 bg-slate-950/30 text-white" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2 text-white">
              <p className="text-sm text-slate-400">Looks good!</p>
              <pre className="rounded-2xl bg-slate-950/40 p-4 text-sm">{JSON.stringify(form.getValues(), null, 2)}</pre>
            </div>
          )}
          <div className="flex gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" className="rounded-2xl border-white/20 text-white" onClick={back}>
                Back
              </Button>
            )}
            <Button type="submit" className="flex-1 rounded-2xl bg-emerald-500 text-white">
              {step === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
          </form>
        </Form>
      </div>
    </AppShell>
  );
}
