"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_URL = "http://localhost:3000";

type ScenarioRun = {
  id: string;
  scenarioName: string;
  status: string;
  duration: number | null;
  error: string | null;
  createdAt: string;
};

const scenarios = [
  { name: "high_load", label: "High Load", description: "Нагружает CPU" },
  { name: "slow_query", label: "Slow Query", description: "Медленный запрос (2 сек)" },
  { name: "system_error", label: "System Error", description: "Генерирует ошибку" },
];

export default function Home() {
  const queryClient = useQueryClient();

  const { data: history, isLoading } = useQuery<ScenarioRun[]>({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/scenarios/history`);
      return res.data;
    },
    refetchInterval: 3000,
  });

  const mutation = useMutation({
    mutationFn: async (scenarioName: string) => {
      const res = await axios.post(`${API_URL}/scenarios/run`, { scenarioName });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  return (
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">🔬 Signal Lab</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {scenarios.map((scenario) => (
              <Card key={scenario.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">{scenario.description}</p>
                  <Button
                      onClick={() => mutation.mutate(scenario.name)}
                      disabled={mutation.isPending}
                      className="w-full"
                  >
                    {mutation.isPending ? "Running..." : "Run Scenario"}
                  </Button>
                </CardContent>
              </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Run History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full text-sm">
                  <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Scenario</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Duration</th>
                    <th className="text-left p-2">Time</th>
                  </tr>
                  </thead>
                  <tbody>
                  {history?.map((run) => (
                      <tr key={run.id} className="border-b">
                        <td className="p-2">{run.scenarioName}</td>
                        <td className="p-2">
                          <Badge variant={run.status === "success" ? "default" : "destructive"}>
                            {run.status}
                          </Badge>
                        </td>
                        <td className="p-2">{run.duration}ms</td>
                        <td className="p-2">
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