ALTER TABLE "ScenarioRun" ADD COLUMN "metadata" JSONB;
ALTER TABLE "ScenarioRun" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'success';
ALTER TABLE "ScenarioRun" DROP COLUMN IF EXISTS "scenarioName";