"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL = "http://localhost:3000";

type ScenarioRun = {
  id: string;
  type: string;
  status: string;
  duration: number | null;
  error: string | null;
  createdAt: string;
};

type FormValues = {
  type: string;
  name?: string;
};

const scenarios = [
  { value: "success", label: "Success", description: "Успешный сценарий" },
  { value: "validation_error", label: "Validation Error", description: "Ошибка валидации (400)" },
  { value: "system_error", label: "System Error", description: "Системная ошибка (500)" },
  { value: "slow_request", label: "Slow Request", description: "Медленный запрос (2-5 сек)" },
  { value: "teapot", label: "🫖 Teapot", description: "Easter egg (418)" },
];

const statusColors: Record<string, "default" | "destructive" | "secondary"> = {
  completed: "default",
  failed: "destructive",
  error: "destructive",
};

export default function Home() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { type: "success" },
  });

  const selectedType = watch("type");

  const { data: history, isLoading } = useQuery<ScenarioRun[]>({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/scenarios/history`);
      return res.data;
    },
    refetchInterval: 3000,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await axios.post(`${API_URL}/api/scenarios/run`, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      if (data.message === "I'm a teapot") {
        toast.success(`🫖 ${data.message}`, {
          description: `Signal: ${data.signal}`,
        });
      } else {
        toast.success(`Scenario completed`, {
          description: `ID: ${data.id} • Duration: ${data.duration}ms`,
        });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message;
      toast.error(`Scenario failed: ${message}`);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
      <main className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">🔬 Signal Lab</h1>
        <p className="text-gray-500 mb-8">Observability playground</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Run Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scenario Type</label>
                  <Select
                      value={selectedType}
                      onValueChange={(value) => setValue("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      {scenarios.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">
                    {scenarios.find((s) => s.value === selectedType)?.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Name (optional)</label>
                  <input
                      {...register("name")}
                      placeholder="Custom run name"
                      className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <Button type="submit" disabled={mutation.isPending} className="w-full">
                  {mutation.isPending ? "Running..." : "Run Scenario"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observability Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="http://localhost:3003" target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition">
                <span>📊</span>
                <div>
                  <p className="text-sm font-medium">Grafana Dashboard</p>
                  <p className="text-xs text-gray-400">localhost:3003</p>
                </div>
              </a>
              <a href="http://localhost:9090" target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition">
                <span>🔥</span>
                <div>
                  <p className="text-sm font-medium">Prometheus</p>
                  <p className="text-xs text-gray-400">localhost:9090</p>
                </div>
              </a>
              <div className="flex items-center gap-2 p-3 border rounded bg-gray-50">
                <span>📋</span>
                <div>
                  <p className="text-sm font-medium">Loki Query</p>
                  <p className="text-xs text-gray-400 font-mono">{`{job="signal-lab"}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded bg-gray-50">
                <span>🐛</span>
                <div>
                  <p className="text-sm font-medium">Sentry</p>
                  <p className="text-xs text-gray-400">sentry.io → your project</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Run History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <p className="text-sm text-gray-400">Loading...</p>
            ) : (
                <table className="w-full text-sm">
                  <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Duration</th>
                    <th className="text-left p-2">Time</th>
                  </tr>
                  </thead>
                  <tbody>
                  {history?.map((run) => (
                      <tr key={run.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono">{run.type}</td>
                        <td className="p-2">
                          <Badge variant={statusColors[run.status] || "secondary"}>
                            {run.status}
                          </Badge>
                        </td>
                        <td className="p-2">{run.duration ? `${run.duration}ms` : "—"}</td>
                        <td className="p-2 text-gray-400">
                          {new Date(run.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
          </CardContent>
        </Card>
      </main>
  );
}