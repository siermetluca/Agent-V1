import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";

export default definePluginEntry({
  id: "agent-v1",
  name: "Agent V1",
  description: "Downstream capability layer for local-first Agent V1 domains.",
  register(api) {
    api.registerService({
      id: "agent-v1",
      start: () => {
        api.logger.info("agent-v1: downstream project plugin active");
      },
      stop: () => {},
    });
  },
});
