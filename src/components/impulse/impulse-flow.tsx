"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUESTION_BANK } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { evaluateImpulseDecision } from "@/lib/decision-engine";
import { RecommendationResult } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useAppData } from "@/providers/app-data-provider";

const formSchema = z.object({
  itemName: z.string().min(2, "Tell us what tempted you"),
  itemPrice: z
    .string()
    .refine((value) => !Number.isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Enter a valid number",
    }),
  category: z.string().min(2),
  notes: z.string().optional(),
});

export const ImpulseFlow = () => {
  const { logImpulse } = useAppData();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemPrice: "",
      category: "electronics",
      notes: "",
    },
  });

  const onDetailsSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values) return;
    setStep(2);
  };

  const handleAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const onSubmitQuestions = () => {
    const values = form.getValues();
    const recommendation = evaluateImpulseDecision({
      price: parseFloat(values.itemPrice),
      answers,
    });

    setResult(recommendation);
    setStep(3);
    logImpulse({
      itemName: values.itemName,
      itemPrice: parseFloat(values.itemPrice),
      category: values.category,
      image: undefined,
      answers,
      recommendation,
    });
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="rounded-3xl border border-white/5 bg-slate-900/70 p-6"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onDetailsSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">What are you about to buy?</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Sony WH-1000XM6" className="bg-slate-950/40 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="itemPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Price</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="$" className="bg-slate-950/40 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-950/40 text-white">
                              <SelectValue placeholder="Pick a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys({ electronics: "Electronics", fashion: "Fashion", food: "Food", entertainment: "Entertainment" }).map((key) => (
                              <SelectItem key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Context (optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} placeholder="Why do you want it?" className="bg-slate-950/40 text-white" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-2xl bg-emerald-500 text-lg font-semibold text-white">
                  Next: Reality check
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="rounded-3xl border border-white/5 bg-slate-900/70 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Impulse firewall</p>
                <h3 className="text-2xl font-semibold text-white">Answer honestly</h3>
              </div>
              <p className="text-sm text-slate-400">{Object.keys(answers).length}/{QUESTION_BANK.length} answered</p>
            </div>
            <div className="space-y-4">
              {QUESTION_BANK.filter((question) => question.alwaysAsk || parseFloat(form.getValues().itemPrice) >= (question.minPriceGate ?? 0)).map((question) => (
                <div key={question.id} className="rounded-2xl border border-white/5 bg-slate-950/30 p-4">
                  <p className="font-semibold text-white">{question.prompt}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        className={`rounded-2xl border px-3 py-2 text-sm transition ${answers[question.id] === option ? "border-emerald-400 bg-emerald-500/20 text-white" : "border-white/10 text-slate-300 hover:border-white/30"}`}
                        onClick={() => handleAnswer(question.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="rounded-2xl border-white/20 text-white" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={onSubmitQuestions} className="flex-1 rounded-2xl bg-emerald-500 text-lg font-semibold text-white">
                See recommendation
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-emerald-500/20 p-8 text-white"
          >
            <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">Decision engine</p>
            <h3 className="mt-2 text-4xl font-semibold">
              {result.recommendation === "RESIST" && "Resist & celebrate"}
              {result.recommendation === "WAIT" && "Delay the dopamine"}
              {result.recommendation === "BUY_NOW" && "Mindful green light"}
            </h3>
            <p className="mt-4 text-lg text-slate-200">{result.message}</p>
            {result.delayHours && (
              <p className="mt-4 text-sm text-amber-300">Timer set for {result.delayHours} hours.</p>
            )}
            {result.xpReward && (
              <p className="mt-4 text-sm text-emerald-300">+{result.xpReward} XP incoming</p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="rounded-2xl border-white/20 text-white" onClick={() => {
                setStep(1);
                setAnswers({});
                setResult(null);
                form.reset();
              }}>
                Run new check
              </Button>
              <Button asChild className="flex-1 rounded-2xl bg-white text-slate-900">
                <a href="/dashboard">See progress</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
